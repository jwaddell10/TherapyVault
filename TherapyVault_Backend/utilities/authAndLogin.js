const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries.js");

module.exports = async function authAndLogin(req, res, next) {
    console.log('auth and login runs')
	passport.authenticate("local", async (error, user, info) => {
		try {
			if (error) {
				console.log(error, "error");
			}

			req.login(user, async (error) => {
				if (error) {
					console.log(error, "error in login");
				}
				return res.send({ user, info });
			});
		} catch (error) {
			console.log(error, "error in catch block");
		}
	})(req, res, next);
};
