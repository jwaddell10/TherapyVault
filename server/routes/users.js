var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");
const authUser = require("../utilities/authAndLogin.js");
const passport = require("passport");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.post("/sign-up", userController.signUp);

router.post("/log-in", function (req, res, next) {
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json("Login failed");
		}

		// NEED TO CALL req.login()!!!
		req.login(user, next);
	})(req, res, next);
});

router.post("/log-out", userController.logOutPost);

module.exports = router;
