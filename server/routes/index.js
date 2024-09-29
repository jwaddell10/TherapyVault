var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");
const authUser = require("../utilities/authAndLogin.js");
const passport = require("passport");
const worksheetController = require("../controllers/worksheetController.js");

/* GET home page. */
router.get("/", function (req, res, next) {
	if (!req.session) {
		return;
	}

	if (req.session) {
		res.json(req.session);
	}
});

router.post("/sign-up", userController.signUp);

router.post("/log-in", userController.logInPost);

router.post("/log-out", userController.logOutPost);

router.get("/demographics", worksheetController.getDemographics);

router.get("/topics", worksheetController.getTopics);

module.exports = router;
