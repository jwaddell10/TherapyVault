const expressAsyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
// const jwt = require("jsonwebtoken")
const jwt = require("../helpers/verifyToken.js");

exports.getFolder = expressAsyncHandler(async (req, res, next) => {
	const folders = await db.findFolders();
	if (folders) {
		return res.json({ folders: folders });
	} else {
		return res.json({ message: "No folders found" });
	}
});

exports.getOneFolder = expressAsyncHandler(async (req, res, next) => {
	const folder = await db.findFolder(parseInt(req.params.id));
	res.json(folder);
});

exports.postFolder = expressAsyncHandler(async (req, res, next) => {
	const verifiedUser = jwt.verifyJWT(req.token);

	const user = await db.findUser(verifiedUser.user.username);
	const folder = await db.createFolder(
		user,
		req.body.formData.name,
		parseInt(req.body.folderId)
	);
	res.json(folder);
});

exports.updateFolder = expressAsyncHandler(async (req, res, next) => {
	jwt.verifyJWT(req.token);

	const title = req.body.title;
	const updatedFolder = await db.updateFolder(parseInt(req.params.id), title);

	res.json(updatedFolder);
});

exports.deleteFolder = expressAsyncHandler(async (req, res, next) => {
	jwt.verifyJWT(req.token);

	const parsedId = parseInt(req.params.id);
	const folderToDelete = await db.deleteFolder(parsedId);

	if (folderToDelete) {
		res.json(folderToDelete);
	} else {
		res.status(400).json({ message: "Error occurred" });
	}
});
