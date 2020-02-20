const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./auth-model');

const authenticate = require('./auth-middleware');
const { signToken, validateToken } = require('./util');
const { validateLogin, validateNewUser, validateAdminCreation } = require('../middleware');

const ifNotEmailAddress = username => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(username);

router.post('/login', validateLogin, async (req, res) => {
	let { username, password } = req.body;

	try {
		if (ifNotEmailAddress(username)) {
			const user = await Users.findByUsername(username.toLowerCase());

			validateToken(user, password, res);
		}

		const user = await Users.findByEmail(username.toLowerCase());

		validateToken(user, password, res);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while logging in' });
	}
});

router.post('/register', validateNewUser, (req, res) => {
	let newUser = req.body;
	const hash = bcrypt.hashSync(newUser.password, process.env.SALT);
	newUser.password = hash;

	Users.add(newUser)
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
			res.status(500).json({ errMessage: 'Error while registering' });
		});
});

// PUT - edit user
router.put('/:id', authenticate, async (req, res) => {
	const { id } = req.params;
	const { password } = req.body;
	const { uid, isAdmin, superUser } = req.locals;

	// base permissions
	if (!isAdmin && !superUser && uid != 1 && uid == req.params.id) {
		let userObj = req.body;

		// cannot set admin/superUser to true
		userObj.isAdmin = false;
		userObj.superUser = false;

		// cannot change own uid
		userObj.id = uid;

		// if password, hash it
		if (password) {
			const hash = bcrypt.hashSync(password, process.env.SALT);
			userObj.password = hash;
		}

		try {
			const user = await Users.editUser(id, userObj);

			return user ? res.status(200).json(user) : res.status(404).json({ errMessage: 'Error' });
		} catch (err) {
			console.log(err);
			res.status(500).json({ errMessage: 'Error' });
		}
	}

	// admin/superUser cannot edit my account
	if (id != 1 && uid != 1) {
		userObj = req.body;

		// admins cannot change their own admin status
		if (userObj.isAdmin) delete userObj.isAdmin;
		if (userObj.superUser) delete user.Obj.superUser;

		// admin/superUser permission
		if (isAdmin || superUser || uid == 1) {
			if (password) {
				const hash = bcrypt.hashSync(password, process.env.SALT);
				userObj.password = hash;
			}

			try {
				const user = await Users.editUser(id, userObj);

				return user ? res.status(200).json(user) : res.status(404).json({ errMessage: 'Error' });
			} catch (err) {
				console.log(err);
				res.status(500).json({ errMessage: 'Error' });
			}
		}
	}

	if (uid == 1) {
		if (password) {
			const hash = bcrypt.hashSync(password, process.env.SALT);
			req.body.password = hash;

			try {
				const user = await Users.editUser(id, req.body);

				res.status(200).json(user);
			} catch (err) {
				console.log(err);
				res.status(500).json({ errMessage: 'Error' });
			}
		}
	}

	return res.status(401).json({ message: 'You do not have permission' });
});

router.put('/super/:id', validateAdminCreation, async (req, res) => {
	const { id } = req.params;
	try {
		const user = await Users.editPermissions(id, req.body);

		if (user) {
			delete user.id;
			delete user.password;
			delete user.email;
		}

		return user ? res.status(200).json(user) : res.status(401).json({ errMessage: 'Error' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error' });
	}
});

module.exports = router;
