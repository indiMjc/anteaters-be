module.exports = (req, res, next) => {
	const { role } = req.body;
	!role && res.status(400).json({ message: 'Unknown role, please sign out and back in to retry' });
	next();
};
