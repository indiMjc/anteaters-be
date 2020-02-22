const bcrypt = require('bcryptjs');
const signToken = require('./signToken');

module.exports = (user, password, res) => {
	if (user && bcrypt.compareSync(password, user.password)) {
		const token = signToken(user);

		res.status(200).json({
			uid: user.id,
			message: `Welcome back, ${user.username}`,
			token
		});
	} else {
		return res.status(401).json({ message: 'Invalid credentials' });
	}
};
