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

//prettier-ignore
// const validateEditCredentials = credentials => {
// 	return (req, res, next) => {
// 		const identifier = req.params[credentials];
// 		const { submitted_by } = req.body
// 		console.log(" : identifier", identifier)
// 		console.log('req body', req.body.submitted_by)
// 		if (!identifier.length) {
// 			return res.status(400).json({ message: 'Could not find credentials' });
// 		}
// 		if (identifier) {
// 			return identifier === 'isAdmin' || 'superUser' || submitted_by
// 				? next()
// 				: res.status(400).json({ message: 'Invalid credentials' })
// 		}

// !identifier && res.status(400).json({ message: 'Could not find credentials' });
// if (identifier == 'isAdmin=true' || 'superUser=true') {
// 	return next();
// }
// if (identifier == req.body.submitted_by) {
// 	return next();
// }
// res.status(400).json({ message: 'Invalid credentials' });
// 	};
// };

module.exports = { validateNewUser, validateLogin, validateEditCredentials };
