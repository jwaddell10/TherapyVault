const db = require("../db/queries.js");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = async (passport) => {
	passport.use(
		new LocalStrategy(async (name, password, done) => {
			try {
				const user = await db.findUser(name);

				if (!user) {
					return done(null, false, { message: "Incorrect username" });
				}

				const match = bcrypt.compare(password, user.password);
				if (!match) {
					return done(null, false, { message: "Incorrect password" });
				}

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		})
	);

	passport.serializeUser((user, done) => {
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
