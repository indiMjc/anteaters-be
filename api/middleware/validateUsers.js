const Users = require('../auth/auth-model');

const Projects = require('../models/projects-model');

// prettier-ignore
const validateNewUser = async (req, res, next) => {
	const { email, username, password, role } = req.body;

	// form field validation
	if (!email) return res.status(400).json({ message: 'Email required' });
	if (!username) return res.status(400).json({ message: 'Username required' });
	if (!password) return res.status(400).json({ message: 'Password required' });
	if (!role) return res.status(400).json({ message: 'Role required' });

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
		res.status(500).json({ errMessage: 'Error while checking for uniqueness', err })
	}	
};

const validateLogin = (req, res, next) => {
	const { username, password } = req.body;
	if (!username) return res.status(400).json({ message: 'Username required' });
	if (!password) return res.status(400).json({ message: 'Password required' });
	next();
};

const validateEditProject = async (req, res, next) => {
	try {
		const project = await Projects.findProjectById(req.params.id);
		const { uid, isAdmin, superUser } = req.token;

		if (!req.token) return res.status(400).json({ message: 'Could not find credentials' });

		// make sure user trying to edit ticket is either an admin, superUser or author
		return uid === project.stakeholder || uid === project.project_manager || superUser || isAdmin
			? next()
			: res.status(400).json({ message: 'Sorry, you do not have permission to edit this ticket' });
	} catch (err) {
		console.log(err);
	}
};

const validateDeleteProject = async (req, res, next) => {
	try {
		const project = await Projects.findProjectById(req.params.id);
		const { uid, isAdmin, superUser } = req.token;

		if (!req.token) return res.status(400).json({ message: 'Could not find credentials' });

		return uid === project.stakeholder || uid === project.project_manager || superUser || isAdmin
			? next()
			: res.status(400).json({ errMessage: 'Sorry, you do not have permission to delete this project' });
	} catch (err) {
		console.log(err);
	}
};

module.exports = { validateNewUser, validateLogin, validateEditProject, validateDeleteProject };
