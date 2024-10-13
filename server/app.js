var createError = require("http-errors");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
// var GoogleStrategy = require("passport-google-oauth2").Strategy;

const express = require("express");
const passport = require("passport");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db/queries.js");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const worksheetRouter = require("./routes/worksheet");
const folderRouter = require("./routes/folder");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
// app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
	expressSession({
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000, // ms
		},
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		store: new PrismaSessionStore(new PrismaClient(), {
			checkPeriod: 2 * 60 * 1000, //ms
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	})
);

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: GOOGLE_CLIENT_ID,
// 			clientSecret: GOOGLE_CLIENT_SECRET,
// 			callbackURL: "http://yourdomain:3000/auth/google/callback",
// 			passReqToCallback: true,
// 		},
// 		function (request, accessToken, refreshToken, profile, done) {
// 			User.findOrCreate({ googleId: profile.id }, function (err, user) {
// 				return done(err, user);
// 			});
// 		}
// 	)
// );

app.use(passport.initialize());
app.use(passport.session());
passport.use(
	new LocalStrategy(async (username, password, done) => {
		console.log("local strat runs");
		try {
			console.log("local strat runs try");

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
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async function (id, done) {
	try {
		const user = await db.findUser(id);
		if (!user) {
			return done(null, false);
		}
		done(null, user);
	} catch (error) {
		done(error);
	}
});

// configurePassport(passport);
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/worksheet", worksheetRouter);
app.use("/folder", folderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// send error as JSON instead of rendering a view
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: req.app.get("env") === "development" ? err : {},
	});
});

module.exports = app;
