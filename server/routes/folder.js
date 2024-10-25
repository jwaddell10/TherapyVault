const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");

router.get("/", folderController.getFolder);
router.post("/", folderController.postFolder);

router.put("/:id/update", folderController.updateFolder)
router.delete("/:id/delete", folderController.deleteFolder)

module.exports = router;
