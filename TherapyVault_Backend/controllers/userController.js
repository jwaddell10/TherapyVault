const asyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const authAndLogin = require("../utilities/authAndLogin.js");

exports.signUp = asyncHandler(async (req, res, next) => {
	const user = await db.findUser(req.body.name);
	console.log(user, "user");

	if (user) {
		return res.status(400).json({ message: "User already exists" });
	}

	const createdUser = await db.createUser(req.body.name, req.body.password);

	authAndLogin(req, res, next);
});

exports.logIn = asyncHandler(async (req, res, next) => {
	// const { name, password } = req.body;
	authAndLogin(req, res, next);
});
