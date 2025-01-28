const expressAsyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const jwt = require("../helpers/verifyToken.js")

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
	console.log(req.token, 'req token')
	const verifiedUser = jwt.verifyJWT(req.token)
	console.log(verifiedUser, 'verified user with expired token?')
	const user = await db.findUser(verifiedUser.user.username)

	const worksheets = await db.findWorksheets(user);
	if (!worksheets) {
		res.status(400).json({ message: "An error has occurred" });
	}
	res.status(200).json(worksheets);
});

exports.getOneWorksheet = expressAsyncHandler(async (req, res, next) => {
	const worksheet = await db.findWorksheet(parseInt(req.params.id));

	if (!worksheet) {
		res.status(404).json({
			message: "Server error has occurred. Please try again later",
		});
	}

	res.json(worksheet);
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
	// const parsedId = parseInt(req.params.id);
	const deletedWorksheet = await db.deleteWorksheet(parseInt(req.params.id));

	if (deletedWorksheet) {
		res.json(deletedWorksheet);
	} else return res.status(400).json({ message: "Error occurred" });
});

exports.updateWorksheet = expressAsyncHandler(async (req, res, next) => {
	const worksheetToUpdate = await db.updateWorksheet(
		parseInt(req.params.id),
		req.body.title
	);
	if (!worksheetToUpdate) {
		res.status(404).json({ message: "Server error. Try again later" });
	}

	res.json(worksheetToUpdate);
});
