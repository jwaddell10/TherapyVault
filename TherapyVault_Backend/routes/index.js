var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");
const authUser = require("../utilities/authAndLogin.js");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/sign-up", userController.signUp);

router.post("/log-in", userController.logInPost);

// router.post("/log-out", function(req, res, next) {
//   console.log(req, 'req')
// });

module.exports = router;
