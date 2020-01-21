const Users = require('../models/users-model');

// prettier-ignore
const validateNewUser = async (req, res, next) => {
	const { email, username, password, role } = req.body;

	const [checkEmail, checkUsername] = await Promise.all([
		Users.findByEmail(email.toLowerCase()),
		Users.findByUsername(username.toLowerCase())
	])

	// form field validation
	!email && res.status(400).json({ message: 'Email required' });
	!username && res.status(400).json({ message: 'Username required' });
	!password && res.status(400).json({ message: 'Password required' });
	!role && res.status(400).json({ message: 'Role required' });
	
	// check for uniqueness
	checkEmail
		? res.status(400).json({ message: 'This email address is already registered' })
		: checkUsername
			? res.status(400).json({ message: 'This username is taken, please try another' })
			: next()
};

const validateLogin = (req, res, next) => {
	const { username, password } = req.body;
	!username && res.status(400).json({ message: 'Username required' });
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
		: credentials === 'superUser'
			? next()
			: credentials === submitted_by
				? next()
				: res.status(400).json({ message: 'Invalid credentials' });
};

module.exports = { validateNewUser, validateLogin, validateEditCredentials };
