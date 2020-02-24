const bcrypt = require('bcryptjs')
const signToken = require('./signToken')

const passwordIsValid = (passwordInput, storedUser) =>
	storedUser && bcrypt.compareSync(passwordInput, storedUser.password) ? true : false

module.exports = (user, password, res) => {
	if (passwordIsValid(password, user)) {
		const token = signToken(user)

		res.status(200).json({
			uid: user.id,
			message: `Welcome back, ${user.username}`,
			token
		})
	} else {
		return res.status(401).json({ message: 'Invalid credentials' })
	}
}
