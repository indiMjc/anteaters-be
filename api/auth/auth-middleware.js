const jwt = require('jsonwebtoken');

const Users = require('../models/users-model');

module.exports = async (req, res, next) => {
	const { authorization, uid } = req.headers;

	if (authorization) {
		const user = await Users.findById(uid);
		const secret = process.env.JWT_SECRET + user.password;

		jwt.verify(authorization, secret, (err, decodedToken) => {
			if (err) {
				console.log(err);
				res.status(401).json({ message: 'Invalid Token' });
			} else {
				req.token = decodedToken;
				next();
			}
		});
	} else {
		res.status(400).json({ message: 'Please login and try again' });
	}
};
