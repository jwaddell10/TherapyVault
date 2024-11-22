module.exports = function loggedIn(req, res, next) {
    console.log(req.user, 'req user in logged in')
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}