const asyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const authAndLogin = require("../utilities/authAndLogin.js");

exports.signUp = asyncHandler(async (req, res, next) => {
	const user = await db.findUser(req.body.name);

	if (user) {
		return res.json({ message: "This username is taken. Try another" });
	}

	if (!user) {
		const createdUser = await db.createUser(
			req.body.name,
			req.body.password
		);
	}

	// authAndLogin(req, res, next);
});

exports.logInPost = asyncHandler(async (req, res, next) => {
    // const user = await db.findUser(req.body.name);
	authAndLogin(req, res, next);
});
