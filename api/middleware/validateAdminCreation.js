const validateAdminCreation = (req, res, next) => {
	const { uid, isAdmin, superUser } = req.token;
	console.log(' : validateAdminCreation -> req.token', req.token);

	if (isAdmin || superUser || uid === 1) return next();

	return res.status(400).json({ message: 'Sorry, you do not have permission to create admins ' });
};

module.exports = validateAdminCreation;
