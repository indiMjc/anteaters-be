const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./auth-model');

const authenticate = require('./auth-middleware');
const { signToken, validateToken } = require('./util');
const { validateLogin, validateNewUser, validateAdminCreation } = require('../middleware');

const checkIfNotEmail = username => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(username);

router.post('/login', validateLogin, async (req, res) => {
	let { username, password } = req.body;

	if (checkIfNotEmail(username)) {
		try {
			const user = await Users.findByUsername(username.toLowerCase());

			validateToken(user, password, res);
		} catch (err) {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while logging in' });
		}
	} else {
		try {
			const user_2 = await Users.findByEmail(username.toLowerCase());

			validateToken(user_2, password, res);
		} catch (err_1) {
			console.log(err_1);
			res.status(500).json({ errMessage: 'Error while logging in' });
		}
	}
});

router.post('/register', validateNewUser, (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 6);
	user.password = hash;

	Users.add(user)
		.then(saved => {
			const token = signToken(saved);

			res.status(200).json({
				uid: saved.id,
				token,
				message: `Welcome, ${saved.username}`
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while registering new user' });
		});
});

router.put('/:id', authenticate, async (req, res) => {
	const { id } = req.params;
	const { password } = req.body;
	const { uid, isAdmin, superUser } = req.locals;

	if (uid === id || uid === 1 || isAdmin || superUser) {
		if (password) {
			const hash = bcrypt.hashSync(password, 6);
			req.body.password = hash;
		}

		try {
			const user = await Users.editUser(id, req.body);

			if (user) {
				delete user.id;
				delete user.password;
				delete user.email;
			}

			return user
				? res.status(200).json(user)
				: res.status(404).json({ message: 'User with specified ID does not exist' });
		} catch (err) {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while editing user' });
		}
	}
	return res.status(401).json({ message: 'You do not have permission to edit this user' });
});

router.put('/permission/:id', validateAdminCreation, async (req, res) => {
	const { id } = req.params;
	try {
		const user = await Users.editPermissions(id, req.body);

		if (user) {
			delete user.id;
			delete user.password;
			delete user.email;
		}

		return user
			? res.status(200).json(user)
			: res.status(401).json({ message: 'User with specified ID does not exist' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while editing user permission' });
	}
});

module.exports = router;
