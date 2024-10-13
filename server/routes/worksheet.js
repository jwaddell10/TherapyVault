var express = require("express");
var router = express.Router();
const worksheetController = require("../controllers/worksheetController.js");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});
const upload = multer({ storage });

router.get("/demographics", worksheetController.getDemographics);

router.get("/topics", worksheetController.getTopics);

router.post(
	"/",
	// upload.single("worksheet"),
	worksheetController.uploadWorksheet
);

router.get("/worksheet/:id", worksheetController.getOne);

module.exports = router;
