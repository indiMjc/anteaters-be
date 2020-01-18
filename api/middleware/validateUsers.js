const validateNewUser = (req, res, next) => {
	const { email, username, password, role } = req.body;
	!email && res.status(400).json({ message: 'Email required' });
	!username && res.status(400).json({ message: 'Username required' });
	!password && res.status(400).json({ message: 'Password required' });
	!role && res.status(400).json({ message: 'Role required' });
	next();
};

const validateLogin = (req, res, next) => {
	const { lowercase_username, password } = req.body;
	!lowercase_username && res.status(400).json({ message: 'Username required' });
	!password && res.status(400).json({ message: 'Password required' });
	next();
};

module.exports = { validateNewUser, validateLogin };
