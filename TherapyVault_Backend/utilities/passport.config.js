const db = require("../db/queries.js");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			try {
				const user = await db.findUser(username);
				console.log(user, "user in local strat");

				if (!user) {
					return done(null, false, { message: "Incorrect username" });
				}

				const match = await bcrypt.compare(password, user.password);
				if (!match) {
					return done(null, false, { message: "Incorrect password" });
				}

				console.log(user, "user from local strat");

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		})
	);

	passport.serializeUser((user, done) => {
		console.log(user, "user from serialize");
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await db.findUser(id);
			console.log(
				user,
				"user from deserialize",
				id,
				"id from deserialize"
			);
			done(null, user);
		} catch (err) {
			done(err);
		}
	});
};
