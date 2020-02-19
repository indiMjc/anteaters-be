const jwt = require('jsonwebtoken');

const Users = require('./auth-model');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if (authorization) {
		try {
			const secret = process.env.JWT_SECRET;

			jwt.verify(authorization, secret, (err, decodedToken) => {
				if (err) {
					console.log(err);

					return res.status(401).json({ errMessage: 'Invalid token' });
				} else {
					req.token = decodedToken;
					req.locals = decodedToken;

					next();
				}
			});
		} catch (err) {
			console.log(err);

			return res.status(401).json({ errMessage: 'Invalid token' });
		}
	} else {
		return res.status(400).json({ message: 'Please login and try again' });
	}
};
