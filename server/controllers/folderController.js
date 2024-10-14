const expressAsyncHandler = require("express-async-handler");
const db = require("../db/queries.js");

exports.getFolder = expressAsyncHandler(async (req, res, next) => {
	const folders = await db.findFolders();
	if (folders) {
        console.log(folders, 'folders')
		return res.json({ folders });
	} else {
		return res.json({ message: "No folders found" });
	}
});

exports.postFolder = expressAsyncHandler(async (req, res, next) => {
	const folder = await db.createFolder(req.body.name);
});
