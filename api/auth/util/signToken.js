const jwt = require('jsonwebtoken');

module.exports = user => {
	const payload = {
		uid: user.id,
		username: user.username,
		isAdmin: user.isAdmin,
		superUser: user.superUser,
		isLocked: user.isLocked
	};

	const secret = process.env.JWT_SECRET;

	const options = {
		expiresIn: '24h'
	};

	return jwt.sign(payload, secret, options);
};
