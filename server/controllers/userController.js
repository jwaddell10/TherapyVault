const asyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const authAndLogin = require("../utilities/authAndLogin.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("../passport");
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
		process.env.SECRET, {expiresIn: "1h"},
		(error, token) => {
			console.log(token, 'this is token')
			res.json({ token });
		}
	);
	// req.login(createdUser, function (err) {
	// 	if (err) {
	// 		return next(err);
	// 	}
	// 	res.json({ sessionID: req.sessionID, username: createdUser.username });
	// });
});

exports.logInPost = asyncHandler(async (req, res, next) => {
	console.log(req.body, "req body in login");
	const user = await db.findUser(req.body.username);
	console.log(user, "user in logijnpost");
	if (user === null) {
		res.json({ message: "Incorrect username." });
	}
	const isMatch = await bcrypt.compare(req.body.password, user.password);

	if (isMatch === false) {
		res.json({ message: "Incorrect password." });
	}
	jwt.sign(
		{ user },
		process.env.SECRET, {expiresIn: "1h"},
		(error, token) => {
			console.log(token, 'this is token')
			res.json({ token });
		}
	);
});

(exports.logOutPost = passport.authenticate("session")),
	(req, res, next) => {
		console.log(req, "req session in logout");
		if (req.user) {
			req.logout(function (error) {
				if (error) {
					return next(error);
				}

				handleSessionDelete(req, res);
			});
		} else {
			res.json({ message: "no user to log out" });
		}
	};

async function handleSessionDelete(req, res) {
	const session = await prisma.session.findUnique({
		where: {
			id: req.headers.authorization,
		},
	});

	if (!session) {
		throw new Error("session error");
	}

	if (session) {
		const deleteSession = await prisma.session.delete({
			where: {
				id: req.headers.authorization,
			},
		});

		res.json({ deleteSession });
	}
}
