var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");
const authUser = require("../utilities/authAndLogin.js");
const passport = require("../passport");

/* GET users listing. */
router.get("/", (req, res, next) => {
	console.log("===== user!!======");
	console.log(req.user, "this should be requser");
	if (req.user) {
		res.json({ user: req.user });
	} else {
		res.json({ user: null });
	}
});

router.post("/sign-up", userController.signUp);

router.post('/log-in', userController.logInPost);

// router.post(
// 	"/log-in",
// 	function (req, res, next) {
// 		console.log("routes/user.js, login, req.body: ");
// 		console.log(req.body);
// 		next();
// 	},
// 	passport.authenticate("local"),
// 	(req, res) => {
// 		console.log(req, 'req in login')
// 		if (req.user) {
// 			// At this point, the session is already created and the session ID cookie is set automatically
// 			console.log("Session ID:", req.sessionID);

// 			res.status(200).json({
// 				message: "Login successful",
// 				sessionID: req.sessionID,
// 			});
// 		} else {
// 			res.status(401).json({
// 				message: "Authentication failed",
// 			});
// 		}
// 	}
// );
// console.log(re, 'req user login')

// req.login(user, function (err) {
// 	if (err) {
// 		return next(err);
// 	}
// 	return res.json({
// 		username: req.user.username,
// 		sessionID: req.sessionID,
// 	});

router.post("/log-out", userController.logOutPost);

module.exports = router;
