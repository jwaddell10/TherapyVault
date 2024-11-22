var express = require("express");
var router = express.Router();
require("dotenv").config();

/* GET home page. */
router.get("/", (req, res, next) => {
	console.log("===== user!!======");
	console.log(req.user, 'req user');
	if (req.user) {
		res.json({ user: req.user });
	} else {
		res.json({ user: null });
	}
});

module.exports = router;
