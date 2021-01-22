const passport = require('passport');
const { Unauthorised } = require('../errors');
const auth = function (req, res, next) {
	try {
		passport.authenticate('bearer', function (err, user, info) {

			if (err) { return next(err); }
			if (!user)
				next(new Unauthorised("You are not authorized to access this resource"))
			req.user = user;
			return next()
		})(req, res, next);
	} catch (ex) {
		throw ex;
	}
};
module.exports = auth;