const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries.js");

module.exports = async function authAndLogin(req, res, next) {
	console.log("auth and login runs");
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			console.log(err, "error was found");
			return next(err);
		}
		if (!user) {
			return res.json(info.message);
		}

		req.login(user, function (err) {
			if (err) {
				return next(err);
			}
			return res.json({
				username: req.user.username,
				sessionID: req.sessionID,
			});
		});
	})(req, res, next);
};
