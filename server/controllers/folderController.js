const expressAsyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getFolder = expressAsyncHandler(async (req, res, next) => {
	const folders = await db.findFolders();
	if (folders) {
		return res.json({ folders });
	} else {
		return res.json({ message: "No folders found" });
	}
});

exports.postFolder = expressAsyncHandler(async (req, res, next) => {
	const folder = await db.createFolder(req.body.name);
});

exports.updateFolder = expressAsyncHandler(async (req, res, next) => {
	const postId = parseInt(req.params.id);
	const { title } = req.body;
	const updatedFolder = await prisma.folder.update({
		where: {
			id: postId,
		},
		data: {
			title: title,
		},
	});

	res.json(updatedFolder);
});
