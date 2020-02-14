const Users = require('../auth/auth-model');

const Projects = require('../models/projects-model');

// prettier-ignore
const validateNewUser = async (req, res, next) => {
	const { email, username, password, role } = req.body;

	if (!email) return res.status(400).json({ message: 'Email required' });
	if (!username) return res.status(400).json({ message: 'Username required' });
	if (!password) return res.status(400).json({ message: 'Password required' });
	if (!role) return res.status(400).json({ message: 'Role required' });

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
		res.status(500).json({ errMessage: 'Error while checking for uniqueness', err })
	}	
};

const validateLogin = (req, res, next) => {
	const { username, password } = req.body;
	if (!username) return res.status(400).json({ message: 'Username required' });
	if (!password) return res.status(400).json({ message: 'Password required' });
	next();
};

module.exports = {
	validateNewUser,
	validateLogin
};
