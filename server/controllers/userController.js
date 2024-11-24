const asyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.signUp = asyncHandler(async (req, res, next) => {
	const user = await db.findUser(req.body.username);
	if (user !== null) {
		return res
			.status(400)
			.json({ message: "This username is taken. Try another" });
	}

	const createdUser = await db.createUser(
		req.body.username,
		req.body.password
	);

	jwt.sign(
		{ user },
		process.env.JWT_SECRET, {expiresIn: "1h"},
		(error, token) => {
			console.log(token, 'this is token')
			res.json({ token });
		}
	);
});

exports.logInPost = asyncHandler(async (req, res, next) => {
	const user = await db.findUser(req.body.username);
	if (user === null) {
		res.json({ message: "Incorrect username." });
	}
	const isMatch = await bcrypt.compare(req.body.password, user.password);

	if (isMatch === false) {
		res.json({ message: "Incorrect password." });
	}
	jwt.sign(
		{ user },
		process.env.JWT_SECRET, {expiresIn: "1h"},
		(error, token) => {
			console.log(token, 'this is token')
			res.json({ token });
		}
	);
});

// (exports.logOutPost = passport.authenticate("session")),
// 	(req, res, next) => {
// 		} else {
// 			res.json({ message: "no user to log out" });
// 		}
// 	};
