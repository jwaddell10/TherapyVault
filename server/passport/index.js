const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const db = require("../db/queries.js")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
    console.log('serializer called')
    console.log(user, 'user in serializer')
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	console.log("deserializeUser called with id:", id);
	try {
		const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
		if (!user) {
			console.log("User not found");
			return done(null, false);
		}
		console.log("User found:", user);
		done(null, user);
	} catch (error) {
		console.log("Error in deserializeUser:", error);
		done(error);
	}
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;
