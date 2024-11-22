module.exports = async function checkAuthentication(req, res, next) {
    console.log(req.user, 'req ues')
	if (req.isAuthenticated()) {
        debugger;
		next();
	} else {
		return res.json(
			"Sorry, you're not allowed to access this. Try again later."
		);
	}
};
