const Users = require('../auth/auth-model');

// prettier-ignore
const validateNewUser = async (req, res, next) => {
	const { email, username, password, role } = req.body;

	
	// check for uniqueness
	try {
		// form field validation
		!email && res.status(400).json({ message: 'Email required' });
		if (!username) return res.status(400).json({ message: 'Username required' });
		if (!password) res.status(400).json({ message: 'Password required' });
		if (!role) return res.status(400).json({ message: 'Role required' });
		const [checkEmail, checkUsername] = await Promise.all([
			Users.findByEmail(email.toLowerCase()),
			Users.findByUsername(username.toLowerCase())
		]);
		
		checkEmail
			? res.status(400).json({ message: 'This email address is already registered' })
			: checkUsername
				? res.status(400).json({ message: 'This username is taken, please try another' })
				: next();
	}
	catch (err) {
		console.log(err)
		res.status(500).json({ errMessage: 'Error while checking for uniqueness', err })
	}	
};

const validateLogin = (req, res, next) => {
	const { username, password } = req.body;
	if (!username) return res.status(400).json({ message: 'Username required' });
	if (!password) return res.status(400).json({ message: 'Password required' });
	next();
};

const validateEdit = (req, res, next) => {
	const { username, isAdmin, superUser } = req.token;

	if (!req.token) return res.status(400).json({ message: 'Could not find credentials' });

	// make sure user trying to edit ticket is either an admin, superUser or author
	return username === req.body.submitted_by || superUser || isAdmin
		? next()
		: res.status(400).json({ message: 'Sorry, you do not have permission to edit this ticket' });
};

module.exports = { validateNewUser, validateLogin, validateEdit };
