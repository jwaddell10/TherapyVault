const expressAsyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getFolder = expressAsyncHandler(async (req, res, next) => {
	const folders = await db.findFolders();
	if (folders) {
		return res.json({ folders: folders });
	} else {
		return res.json({ message: "No folders found" });
	}
});

exports.getOneFolder = expressAsyncHandler(async (req, res, next) => {
	const folderId = parseInt(req.params.id);
	// const folder = await db.findFolder()
	const folder = await prisma.folder.findMany({
		include: {
			worksheet: true,
		}
	});
	res.json(folder)
});

exports.postFolder = expressAsyncHandler(async (req, res, next) => {
	console.log(req.body, 'req in postfolder')
	const user = await db.findUser(req.body.username)
	const folder = await db.createFolder(user, req.body.formData.name);
	res.json(folder);
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

exports.deleteFolder = expressAsyncHandler(async (req, res, next) => {
	const parsedId = parseInt(req.params.id);
	const folderToDelete = await db.deleteFolder(parsedId);
	console.log(folderToDelete, 'foldertodelete')
	if (folderToDelete) {
		res.json(folderToDelete);
	} else {
		res.status(400).json({ message: "Error occurred" });
	}
});
