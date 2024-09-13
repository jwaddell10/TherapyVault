var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/signup", userController.signUp);

module.exports = router;
