var express = require("express");
var router = express.Router();
const db = require("../db/queries.js");
const worksheetController = require("../controllers/worksheetController.js");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/images");
	},
	filename: function (req, file, cb) {
		// const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		return cb(null, `${Date.now()}_${file.originalname}`);
	},
});

const upload = multer({ storage: storage });

router.get("/", worksheetController.getWorksheets);

router.get("/demographics", worksheetController.getDemographics);

router.get("/topics", worksheetController.getTopics);

router.post("/", upload.single("worksheet"), async function (req, res) {
	try {
		// const findUserBySessionId = await db.findUserBySessionId(req.sessionID)
		// console.log(findUserBySessionId)
		// console.log(req.file, "req file", req.body, "req body");
		const user = await db.findUser(req.body.username);
		console.log(user, 'user in post')
		if (!user) {
			res.status(404).json({
				message: "Username not found. Try again later",
			});
		}

		const worksheet = await db.createWorksheet(user, req.body.title);
		console.log(worksheet, "worksheet in createworksheet");

		res.status(200).json({ message: "File uploaded successfully" });
		// const worksheet = await db.createWorksheet(req.body.title)
		// console.log(worksheet, 'created worksheet')
		// console.log(req.file, "req file", req.body, "req body");
		// res.status(200).json({ message: "File uploaded successfully" });
	} catch (error) {
		console.error("Error in file upload:", error);
		res.status(500).json({ error: "An error occurred during file upload" });
	}
});

router.get("/worksheet/:id", worksheetController.getOneWorksheet);

module.exports = router;
