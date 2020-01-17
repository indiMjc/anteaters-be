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

const validateNewUser = (req, res, next) => {
	const { email, username, password, role } = req.body;
	!email && res.status(400).json({ message: 'Email required' });
	!username && res.status(400).json({ message: 'Username required' });
	!password && res.status(400).json({ message: 'Password required' });
	!role && res.status(400).json({ message: 'Role required' });
	next();
};

const validateLogin = (req, res, next) => {
	const { username, password } = req.body;
	!username && res.status(400).json({ message: 'Username required' });
	!password && res.status(400).json({ message: 'Password required' });
	next();
};

const login = (req, res) => {
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

router.post('/login', validateLogin, (req, res) => {
	login(req, res);
});

router.post('/register', validateNewUser, (req, res) => {
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
