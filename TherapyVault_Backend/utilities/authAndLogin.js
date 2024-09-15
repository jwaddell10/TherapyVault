const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require ("../db/queries.js")

module.exports = async function authAndLogin(req, res, next) {
    console.log(req.body, 'reqbody in authlogin')

    const user = await db.findUser(req.body.name)
    console.log(user, 'user in authlogin')
	// const name = name;
    // console.log(name, 'name in auth')
	// if (error) {
	// 	return error, "error";
	// }

	// passport.authenticate('local', {
    //     successRedirect: "/",
    //     failureRedirect: "/"
    // })
};
