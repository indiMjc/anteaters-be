const Users = require('../models/users-model');

// prettier-ignore
const validateNewUser = async (req, res, next) => {
	const { email, username, password, role } = req.body;

	// form field validation
	!email && res.status(400).json({ message: 'Email required' });
	!username && res.status(400).json({ message: 'Username required' });
	!password && res.status(400).json({ message: 'Password required' });
	!role && res.status(400).json({ message: 'Role required' });

	// check for uniqueness
	try {
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
		res.status(500).json({ error: 'Error while checking for uniqueness' })
	}	
};

const validateLogin = (req, res, next) => {
	const { username, password } = req.body;
	!username && res.status(400).json({ message: 'Username required' });
	!password && res.status(400).json({ message: 'Password required' });
	next();
};

// prettier-ignore
const validateEditCredentials = (req, res, next) => {
		const { credentials, isAdmin, superUser } = req.token

		!credentials || !user || !superUser && 
			res.status(400).json({ message: 'Could not find credentials' });

		return isAdmin
			? next()
			: superUser
				? next()
				: user === req.body.submitted_by
					? next()
					: res.status(400).json({ message: 'Sorry, you do not have permission to edit this ticket' });
	};

module.exports = { validateNewUser, validateLogin, validateEditCredentials };
