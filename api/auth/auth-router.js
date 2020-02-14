const router = require('express').Router();
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const Users = require('./auth-model');

const signToken = require('./util/signToken');
const validateToken = require('./util/validateToken');
const { validateLogin, validateNewUser } = require('../middleware/validateAuthData');

// const validateToken = validateToke();

// const signToken = user => {
// 	const payload = {
// 		uid: user.id,
// 		username: user.username,
// 		isAdmin: user.isAdmin,
// 		superUser: user.superUser,
// 		isLocked: user.isLocked
// 	};

// 	const secret = process.env.JWT_SECRET + user.password;

// 	const options = {
// 		expiresIn: '24h'
// 	};

// 	return jwt.sign(payload, secret, options);
// };

// const validateToken = (user, password, res) => {
// 	if (user && bcrypt.compareSync(password, user.password)) {
// 		const token = signToken(user);

// 		res.status(200).json({
// 			uid: user.id,
// 			message: `Welcome back, ${user.username}`,
// 			token
// 		});
// 	} else {
// 		res.status(401).json({ message: 'Invalid credentials' });
// 	}
// };

router.post('/login', validateLogin, async (req, res) => {
	console.log(' : validateToken', validateToken);
	let { username, password } = req.body;

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(username)) {
		try {
			const user = await Users.findByUsername(username.toLowerCase());
			validateToken(user, password, res);
		} catch (err) {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while logging in', err });
		}
	} else {
		try {
			const user_2 = await Users.findByEmail(username.toLowerCase());
			handleValidateToken(user_2, password, res);
		} catch (err_1) {
			console.log(err_1);
			res.status(500).json({ errMessage: 'Error while logging in', err_1 });
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
			res.status(500).json({ errMessage: 'Error while registering new user', err });
		});
});

module.exports = router;
