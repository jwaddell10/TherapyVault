const express = require("express")
const router = express.Router();
const folderController = require("../controllers/folderController")

router.post("/", folderController.postFolder);

module.exports = router;