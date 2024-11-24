var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");

router.post("/sign-up", userController.signUp);

router.post('/log-in', userController.logInPost);

// router.post("/log-out", userController.logOutPost);

module.exports = router;
