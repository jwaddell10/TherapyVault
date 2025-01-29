var express = require("express");
var router = express.Router();
require("dotenv").config();
// import { handleUpload } from "../utilities/cloudinary.js";
const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;
const db = require("../db/queries.js");
const worksheetController = require("../controllers/worksheetController.js");
const PDFDocument = require("pdfkit");
const fs = require("fs");

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

router.get("/", jwtVerify.verifyToken, worksheetController.getWorksheets);
router.get("/:id", worksheetController.getOneWorksheet);

router.get("/demographics", worksheetController.getDemographics);

router.get("/topics", worksheetController.getTopics);

router.post(
	"/",
	jwtVerify.verifyToken,
	upload.single("worksheet"),
	async function (req, res) {
		const verifiedUser = jwtVerify.verifyJWT(req.token);
		if (!verifiedUser) {
			return res.status(403).json({
				message:
					"Access forbidden. Try logging out and logging in again to resolve",
			});
		}

		try {
			if (!req.file) {
				return res.status(400).json({ message: "No file uploaded" });
			}

			let result;

			if (req.file.mimetype === "application/pdf") {
				// Directly upload the PDF
				result = await uploadToCloudinary(req.file.buffer);
			} else if (
				["image/jpeg", "image/png"].includes(req.file.mimetype)
			) {
				// Convert JPG or PNG to PDF
				const pdfBuffer = await convertImageToPDF(req.file.buffer);
				result = await uploadToCloudinary(pdfBuffer);
			} else {
				return res.status(400).json({
					message: "Uploaded file must be a JPG, PNG, or PDF file",
				});
			}

			// Save worksheet details to database
			await db.createWorksheet(
				verifiedUser.user,
				req.body.title,
				parseInt(req.body.folderId),
				result.secure_url
			);

			res.json({
				message:
					req.file.mimetype === "application/pdf"
						? "PDF uploaded successfully"
						: "File converted to PDF and uploaded successfully",
				url: result.secure_url,
			});
		} catch (error) {
			res.status(500).json({
				error: "An error occurred during file upload",
			});
		}
	}
);

async function uploadToCloudinary(buffer) {
	return new Promise((resolve, reject) => {
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

		const readableStream = new Readable();
		readableStream.push(buffer);
		readableStream.push(null);
		readableStream.pipe(uploadStream);
	});
}

async function convertImageToPDF(imageBuffer) {
	return new Promise((resolve, reject) => {
		const pdfDoc = new PDFDocument({
			size: [595.28, 841.89],
			margins: { top: 10, bottom: 10, left: 10, right: 10 },
		});

		let pdfBuffer = [];
		pdfDoc.on("data", (chunk) => pdfBuffer.push(chunk));
		pdfDoc.on("end", () => resolve(Buffer.concat(pdfBuffer)));

		pdfDoc.image(imageBuffer, {
			fit: [595.28, 841.89],
			align: "center",
			valign: "center",
		});

		pdfDoc.end();
	});
}

router.delete("/:id/delete", worksheetController.deleteWorksheet);

router.put("/:id/update", worksheetController.updateWorksheet);

module.exports = router;
