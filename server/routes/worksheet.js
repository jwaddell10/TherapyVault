var express = require("express");
var router = express.Router();
require("dotenv").config();
// import { handleUpload } from "../utilities/cloudinary.js";
const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;
const db = require("../db/queries.js");
const worksheetController = require("../controllers/worksheetController.js");
// console.log(checkAuthentication, 'check auth')
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const multer = require("multer");
const storage = multer.memoryStorage(); // store image in memory
const upload = multer({ storage: storage });
const jwtVerify = require("../helpers/verifyToken.js");

router.get("/", worksheetController.getWorksheets);
router.get("/:id", worksheetController.getOneWorksheet);

router.get("/demographics", worksheetController.getDemographics);

router.get("/topics", worksheetController.getTopics);

router.post(
	"/",
	jwtVerify.verifyToken,
	upload.single("worksheet"),
	async function (req, res) {
		const verifiedUser = jwtVerify.verifyJWT(req.token);
		try {
			if (!req.file) {
				return res.status(400).json({ message: "No file uploaded" });
			}
			// console.log(req.body, 'req body')
			const user = await db.findUser(verifiedUser.user.username);
			// Create a stream from the buffer
			const stream = Readable.from(req.file.buffer);

			// Upload stream to Cloudinary
			const result = await new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream(
					{
						folder: "worksheets",
						resource_type: "auto",
					},
					(error, result) => {
						if (error) reject(error);
						else resolve(result);
					}
				);

				stream.pipe(uploadStream);
			});

			// TODO: Save worksheet details to database
			const worksheet = await db.createWorksheet(
				user,
				req.body.title,
				parseInt(req.body.folderId),
				result.secure_url
			);

			res.json({
				message: "File uploaded successfully",
				url: result.secure_url,
			});
		} catch (error) {
			console.error("Error in file upload:", error);
			res.status(500).json({
				error: "An error occurred during file upload",
			});
		}
	}
);

router.delete("/:id/delete", worksheetController.deleteWorksheet);

router.put("/:id/update", worksheetController.updateWorksheet);

module.exports = router;
