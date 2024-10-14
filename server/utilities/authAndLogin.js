const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries.js");

module.exports = async function authAndLogin(req, res, next) {
	console.log("auth runs");
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			console.log(err, "err");
			return res.status(500).json({ message: "An error occurred" });
		}
		if (!user) {
			return res.status(401).json({ message: "No user found" });
		}
		req.login(user, (loginErr) => {
			const sessionID = req.sessionID;
			if (loginErr) {
				console.log(loginErr, "loginerr");
				throw new Error("login failed");
			}
			return res.json({ message: "Login successful", sessionID });
		});
	})(req, res, next);
};
