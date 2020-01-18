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

// prettier-ignore
const validateEditCredentials = (req, res, next) => {
	const { credentials, submitted_by } = req.body;
	delete req.body.credentials;
	!credentials && res.status(400).json({ message: 'Could not find credentials' });
	return credentials === 'isAdmin'
		? next()
		: credentials === 'superuser'
			? next()
			: credentials === submitted_by
				? next()
				: res.status(400).json({ message: 'Invalid credentials' });
};

module.exports = { validateNewUser, validateLogin, validateEditCredentials };
