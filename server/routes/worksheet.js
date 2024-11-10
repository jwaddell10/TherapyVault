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
router.get("/:id", worksheetController.getOneWorksheet);

router.get("/demographics", worksheetController.getDemographics);

router.get("/topics", worksheetController.getTopics);

router.post("/", upload.single("worksheet"), async function (req, res) {
	//maybe double this and add worksheet to folder in query?
	try {
		const user = await db.findUser(req.body.username);
		if (!user) {
			console.log("no user");
			res.status(404).json({
				message: "Username not found. Try again later",
			});
		}

		const worksheet = await db.createWorksheet(
			user,
			req.body.title,
			parseInt(req.body.folderId)
		);

		if (worksheet) {
			console.log(worksheet, 'this is worksheet')
			res.json({ message: "worksheet created" });
		} else res.status(404).json({ message: "Error has occurred during file upload." });
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}

	// 	res.json({ message: "File uploaded successfully" });
	// } catch (error) {
	// 	console.error("Error in file upload:", error);
	// 	res.status(500).json({ error: "An error occurred during file upload" });
	// }
});

router.delete("/:id/delete", worksheetController.deleteWorksheet);

router.put("/:id/update", worksheetController.updateWorksheet);

module.exports = router;
