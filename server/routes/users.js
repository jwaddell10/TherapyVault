var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");
const authUser = require("../utilities/authAndLogin.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.post("/sign-up", userController.signUp);

router.post("/log-in", userController.logInPost);

router.post("/log-out", userController.logOutPost);

module.exports = router;
