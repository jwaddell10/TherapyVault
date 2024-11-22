const db = require("../db/queries.js")
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcryptjs")

const strategy = 
	new LocalStrategy(async (username, password, done) => {
		console.log("LocalStrategy is being called", username);
		try {
			const user = await db.findUser(username);
			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				return done(null, false, { message: "Incorrect password" });
			}
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	})

module.exports = strategy