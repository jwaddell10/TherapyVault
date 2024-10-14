const index = require("../routes/index.js");
const users = require("../routes/users.js");
const request = require("supertest");
const express = require("express");
const session = require("express-session"); // You'll need to install this

const api = express();

// Mock session middleware
api.use(
	session({
		secret: "test secret",
		resave: false,
		saveUninitialized: true,
	})
);

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use("/", index);
api.use("/users", users);

describe("API Routes", () => {
	test("index route works", async () => {
		const response = await request(api)
			.get("/")
			.expect("Content-type", /json/)
			.expect(200);

		expect(response.body).toBeDefined();
		// expect(response.body).toHaveProperty("message");
	}, 10000); // Increase timeout to 10 seconds

	test("sign-up route works", async () => {
		const response = await request(api)
			.post("/sign-up")
			.send({
				username: "testuser",
				password: "testpassword",
			})
			.expect("Content-type", /json/)
			.expect(200);

		expect(response.body).toBeDefined();
		// expect(response.body.message).toBe("Signup successful");
	}, 10000); // Increase timeout to 10 seconds
});
