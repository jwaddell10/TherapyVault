const asyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const authAndLogin = require("../utilities/authAndLogin.js");

exports.signUp = asyncHandler(async (req, res, next) => {
	const user = await db.findUser(req.body.name);

	if (!user) {
		const createdUser = await db.createUser(
			req.body.name,
			req.body.password
		);
	}

	if (user) {
		res.status(400).json("User already exists");
	}

	authAndLogin(req, res, next);
});

exports.logIn = asyncHandler(async (req, res, next) => {
	// const { name, password } = req.body;
	authAndLogin(req, res, next);
});
