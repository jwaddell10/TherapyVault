const asyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const passport = require("passport");
const authAndLogin = require("../utilities/authAndLogin.js");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.signUp = asyncHandler(async (req, res, next) => {
	const user = await db.findUser(req.body.username);

	if (user) {
		return res.status(400).json({ message: "This username is taken. Try another" });
	}
	if (!user) {
		const createdUser = await db.createUser(
			req.body.username,
			req.body.password
		);
	}
	authAndLogin(req, res, next);
});

exports.logInPost = asyncHandler(async (req, res, next) => {
	authAndLogin(req, res, next)
});

exports.logOutPost = asyncHandler(async (req, res, next) => {
	//fix bug where user hits logout (and theres a session) but it fails to fetch the correct session

	req.logout(function(error) {
		if (error) {
			return next(error);
		}

		handleSessionDelete(req, res);
	})
});

async function handleSessionDelete(req, res) {
	const session = await prisma.session.findUnique({
		where: {
			id: req.headers.authorization,
		},
	});

	if (!session) {
		throw new Error("session error")
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
