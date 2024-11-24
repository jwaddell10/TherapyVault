const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");
const jwtVerify = require("../helpers/verifyToken.js")

router.get("/", jwtVerify.verifyToken, folderController.getFolder);
router.post("/", jwtVerify.verifyToken, folderController.postFolder);

router.put("/:id/update", jwtVerify.verifyToken, folderController.updateFolder)
router.delete("/:id/delete", jwtVerify.verifyToken, folderController.deleteFolder)
router.get("/:id", folderController.getOneFolder);

module.exports = router;
