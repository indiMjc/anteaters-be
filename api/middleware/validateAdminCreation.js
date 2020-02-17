const jwt = require('jsonwebtoken');

const validateAdminCreation = (req, res, next) => {
	const { authorization } = req.headers;

	if (authorization) {
		try {
			const secret = process.env.JWT_SECRET;

			jwt.verify(authorization, secret, (err, decodedToken) => {
				if (err) {
					console.log(err);

					return res.status(401).json({ errMessage: 'Invalid token' });
				} else {
					const { isAdmin, superUser, uid } = decodedToken;

					if (isAdmin || superUser || uid === 1) return next();

					return res.status(401).json({ errMessage: 'You do not have permission to create admins' });
				}
			});
		} catch (err) {
			console.log(err);

			return res.status(401).json({ errMessage: 'Invalid token' });
		}
	}
};

module.exports = { validateAdminCreation };