var express = require("express");
var router = express.Router();
require("dotenv").config();
// import { handleUpload } from "../utilities/cloudinary.js";
const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;
const db = require("../db/queries.js");
const worksheetController = require("../controllers/worksheetController.js");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const multer = require("multer");
const storage = multer.memoryStorage(); // store image in memory
const upload = multer({ storage: storage });

// module.exports = upload;
// const multer = require("multer");
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(
// 			null,
// 			`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`
// 		);
// 	},
// 	filename: function (req, file, cb) {
// 		// const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// 		return cb(null, `${Date.now()}_${file.originalname}`);
// 	},
// });
router.get("/", worksheetController.getWorksheets);
router.get("/:id", worksheetController.getOneWorksheet);

router.get("/demographics", worksheetController.getDemographics);

router.get("/topics", worksheetController.getTopics);

router.post("/", upload.single("worksheet"), async function (req, res) {
	console.log("post runs");
	try {
		if (!req.file) {
			return res.status(400).json({ message: "No file uploaded" });
		}
		// console.log(req.body, 'req body')
		const user = await db.findUser(req.body.username)
		// Create a stream from the buffer
		const stream = Readable.from(req.file.buffer);

		// Upload stream to Cloudinary
		const result = await new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder: "worksheets", // Optional: specify a folder in your Cloudinary account
					resource_type: "auto", // Automatically detect the file type
				},
				(error, result) => {
					if (error) reject(error);
					else resolve(result);
				}
			);

			stream.pipe(uploadStream);
		});

		console.log(result.secure_url);

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
		res.status(500).json({ error: "An error occurred during file upload" });
	}
});

router.delete("/:id/delete", worksheetController.deleteWorksheet);

router.put("/:id/update", worksheetController.updateWorksheet);

module.exports = router;
