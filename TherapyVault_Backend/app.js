var createError = require("http-errors");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const express = require("express");
const passport = require("passport");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db/queries.js");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
require("dotenv").config();
// const configurePassport = require("./utilities/passport.config.js");

const app = express();

app.use(cors()); // Add this line to enable CORS
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));

app.use(
	expressSession({
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000, // ms
		},
		secret: "a santa at nasa",
		resave: true,
		saveUninitialized: true,
		store: new PrismaSessionStore(new PrismaClient(), {
			checkPeriod: 2 * 60 * 1000, //ms
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await db.findUser(username);
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
	done(null, user);
});

passport.deserializeUser(async (error, id, done) => {
	try {
		const user = await db.findUser(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

app.post("/log-in", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return res.status(500).json({ message: "An error occurred" });
		}
		if (!user) {
			return res.status(401).json({ message: "No user found" });
		}
		req.login(user, (loginErr) => {
			if (loginErr) {
				return res.status(500).json({ message: "Login failed" });
			}
			return res.json({ message: "Login successful", user });
		});
	})(req, res, next);
});

app.post("/log-out", (req, res) => {
	req.logout((err) => {
		if (err) {
			return res.status(500).json({ message: "Logout failed" });
		}
		res.json({ message: "Logout successful" });
	});
});
//
// configurePassport(passport);
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
