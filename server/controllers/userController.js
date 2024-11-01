const asyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const authAndLogin = require("../utilities/authAndLogin.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.signUp = asyncHandler(async (req, res, next) => {
    const user = await db.findUser(req.body.username);

    if (user) {
        return res.status(400).json({ message: "This username is taken. Try another" });
    }

    const createdUser = await db.createUser(
        req.body.username,
        req.body.password
    );

    // Set the user on the request object for authAndLogin
    req.user = createdUser;

    // Call authAndLogin, which should handle sending the response
    authAndLogin(req, res, next);
});

exports.logInPost = asyncHandler(async (req, res, next) => {
	console.log("login post runs");
	authAndLogin(req, res, next);
});

exports.logOutPost = asyncHandler(async (req, res, next) => {
	//fix bug where user hits logout (and theres a session) but it fails to fetch the correct session
console.log('logout post runs')
	req.logout(function (error) {
		console.log('logout runs')
		if (error) {
			return next(error);
		}

		handleSessionDelete(req, res);
	});
});

async function handleSessionDelete(req, res) {
	console.log(req, 'req in handle session delete')
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
