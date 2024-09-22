const index = require("../routes/index.js");
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

test("index route works", (done) => {
	request(app).get("/").expect("Content-type", /json/).expect(200, done);
});

test("sign-up route works", (done) => {
	request(app).post("/sign-up").expect(200, done)
});
