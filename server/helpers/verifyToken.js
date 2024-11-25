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
    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        return verifiedUser;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

module.exports = { verifyToken, verifyJWT };
