require("dotenv").config();
const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
console.log('verify token runs')
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[0];

		req.token = bearerToken;
		next();
		// jwt.verify({token}, process.env.SECRET, function(err, decoded) {
		//     console.log(decoded, 'decoded jwt?')
		// })
	} else {
		res.sendStatus(403);
	}
}

function verifyJWT(token) {
	return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { verifyToken, verifyJWT };
