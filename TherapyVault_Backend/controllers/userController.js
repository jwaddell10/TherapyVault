const asyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const passport = require("passport");
const authAndLogin = require("../utilities/authAndLogin.js");

exports.signUp = asyncHandler(async (req, res, next) => {
	const user = await db.findUser(req.body.username);

	if (user) {
		return res.json({ message: "This username is taken. Try another" });
	}
    // console.log('is this running')

	if (!user) {
		const createdUser = await db.createUser(
			req.body.username,
			req.body.password
		);
		res.json({ createdUser });
	}

	// authAndLogin(req, res, next);
});

// exports.logInPost = asyncHandler(async (req, res, next) => {
// 	console.log(req.body, "reqbody login");
// 	passport.authenticate("local", {
// 		successMessage: console.log(req.user, 'requser in loginpost'),
// 		failureMessage: "failed",
// 	});
// 	console.log(req.user, 'requser in loginpost')
// 	// const user = await db.findUser(req.body.name);
// 	// authAndLogin(req, res, next);
// });

exports.logOutPost = asyncHandler(async (req, res, next) => {
    // console.log('/users/' + req.user.username);
    console.log(req.session, 'reqsession before logout')
	req.logout((error) => {
        if (error) {
            return next(error);
        } console.log(req.user, 'req user')
    })
    console.log(req.session, 'reqsession after logout')
});
