var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const bcryptjs = require("bcryptjs")
const { Pool } = require("pg");
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
require("dotenv").config();

var app = express();

app.use(cors()); // Add this line to enable CORS
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// const pool = new Pool({
// 	host: process.env.HOST
// });

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));

// app.use(
// 	expressSession({
// 		cookie: {
// 			maxAge: 7 * 24 * 60 * 60 * 1000, // ms
// 		},
// 		secret: "a santa at nasa",
// 		resave: true,
// 		saveUninitialized: true,
// 		store: new PrismaSessionStore(new PrismaClient(), {
// 			checkPeriod: 2 * 60 * 1000, //ms
// 			dbRecordIdIsSessionId: true,
// 			dbRecordIdFunction: undefined,
// 		}),
// 	})
// );
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("index"));

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
