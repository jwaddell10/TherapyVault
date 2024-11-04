const expressAsyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const cloudinary = require("cloudinary").v2;

exports.getDemographics = expressAsyncHandler(async (req, res, next) => {
	const demographics = await db.findDemographics();
	if (demographics) {
		return res.json(demographics);
	}

	if (!demographics) {
		res.status(404).json({ message: "no demographics found" });
	}
});

exports.getTopics = expressAsyncHandler(async (req, res, next) => {
	const topics = await db.findTopics();
	if (topics) {
		return res.json(topics);
	}
});

exports.getWorksheets = expressAsyncHandler(async (req, res, next) => {
	const worksheets = await db.findWorksheets();
	if (!worksheets) {
		res.status(400).json({ message: "An error has occurred" });
	}
	res.status(200).json(worksheets);
});

exports.getOneWorksheet = expressAsyncHandler(async (req, res, next) => {
	console.log(req.body, "this is req get one");
});

exports.uploadWorksheet = expressAsyncHandler(async (req, res, next) => {
	console.log("upload worksheet route works");
	// const file = req.file;
	// console.log(req.body, "req body");

	// console.log(file, "file");

	// const uploadedResult = await cloudinary.uploader
	// 	.upload(file)
	// 	.catch((error) => console.log(error, "error"));

	// console.log(uploadedResult, "uplaoded result");

	// const uploadResult = await cloudinary.uploader
	// .upload(
	//     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
	//         public_id: 'shoes',
	//     }
	// )
	// .catch((error) => {
	//     console.log(error);
	// });
});

exports.deleteWorksheet = expressAsyncHandler(async (req, res, next) => {
	const parsedId = parseInt(req.params.id);
	const deletedWorksheet = await db.deleteWorksheet(parsedId);

	if (deletedWorksheet) {
		res.json(deletedWorksheet);
	} else return res.status(400).json({ message: "Error occurred" });
});
