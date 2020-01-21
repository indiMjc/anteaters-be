const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users-model');

const auth = require('../middleware/validateUsers');

const signToken = user => {
	const payload = {
		username: user.username,
		role: user.role,
		isAdmin: user.isAdmin,
		superUser: user.superUser
	};

	const secret = process.env.JWT_SECRET + user.password;

	const options = {
		expiresIn: '24h'
	};

	return jwt.sign(payload, secret, options);
};

const handleValidateToken = (user, password, res) => {
	if (user && bcrypt.compareSync(password, user.password)) {
		const token = signToken(user);

		res.status(200).json({
			uid: user.id,
			message: `Welcome back, ${user.username}`,
			token
		});
	} else {
		res.status(401).json({ message: 'Invalid credentials' });
	}
};

router.post('/login', auth.validateLogin, (req, res) => {
	let { username, password } = req.body;

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(req.username)) {
		return Users.findByUsername(username)
			.then(user => {
				handleValidateToken(user, password, res);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({ error: 'Error while logging in' });
			});
	} else {
		return Users.findByEmail(username)
			.then(user => {
				handleValidateToken(user, password, res);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({ error: 'Error while logging in' });
			});
	}
});

router.post('/register', auth.validateNewUser, (req, res) => {
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
			res.status(500).json({ error: 'Error while registering new user' });
		});
});

module.exports = router;
