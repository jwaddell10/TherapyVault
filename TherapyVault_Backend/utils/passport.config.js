const db = require("../db/queries.js");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
	new LocalStrategy(async (name, password, done) => {
		try {
			const user = await db.findUser(name);
			console.log(user, "user");

			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}

			if (user.password !== password) {
				return done(null, false, { message: "Incorrect password" });
			}
		} catch (error) {
			return done(error);
		}
	})
);
