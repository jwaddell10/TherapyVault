require("dotenv").config();
const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {

    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[0];

		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
}

function verifyJWT(token) {
	return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { verifyToken, verifyJWT };
