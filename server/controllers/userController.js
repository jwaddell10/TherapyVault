const asyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const authAndLogin = require("../utilities/authAndLogin.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
	req.login(createdUser, function (err) {
		if (err) {
			return next(err);
		}
		res.json({ sessionID: req.sessionID, username: createdUser.username });
	});
});

exports.logInPost = asyncHandler(async (req, res, next) => {});

exports.logOutPost = asyncHandler(async (req, res, next) => {
	req.logout(function (error) {
		if (error) {
			return next(error);
		}

		handleSessionDelete(req, res);
	});
});

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
