const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries.js");

// module.exports = async function authAndLogin(req, res, next) {
// 	console.log('auth and login runs')
// 	passport.authenticate("local", (err, user, info) => {
// 		if (err) {
// 			console.log(err, "error logged here");
// 			return res.status(500).json({ message: "An error occurred" });
// 		}

// 		if (!user) {
// 			return res.status(401).json({ message: "No user found" });
// 		}
// 	})(req, res, next);
// };
