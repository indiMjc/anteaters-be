const validateAdmin = (req, res, next) => {
	if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' });

	const { isAdmin, superUser } = req.locals;

	if (isAdmin || superUser) next();

	return res.status(401).json({ message: 'Sorry, you do not have permission' });
};

module.exports = validateAdmin;
