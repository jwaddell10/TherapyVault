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
	const verifiedUser = jwt.verifyJWT(req.token)
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

exports.deleteWorksheet = expressAsyncHandler(async (req, res, next) => {
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
