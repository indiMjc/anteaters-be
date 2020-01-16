const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users-model');

const signToken = user => {
	const payload = {
		username: user.username
	};

	const secret = process.env.JWT_SECRET;

	const options = {
		expiresIn: '24h'
	};

	return jwt.sign(payload, secret, options);
};

const login = (req, res) => {
	console.log('request body', req.body);
	let { username, password } = req.body || req;

	Users.findBy({ username })
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = signToken(user);

				res.status(200).json({
					token,
					message: `Welcome, ${user.username}`
				});
			} else {
				res.status(401).json({ message: 'Invalid credentials' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Error while logging in' });
		});
};

router.post('/login', (req, res) => {
	console.log('login');
	login(req, res);
});

router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 6);
	const pw = user.password;
	user.password = hash;

	Users.add(user)
		.then(saved => {
			saved.password = pw;
			login(saved, res);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Error while registering new user' });
		});
});

module.exports = router;
