const jwt = require('jsonwebtoken')

const invalidToken = res => res.status(401).json({ errMessage: 'Invalid token' })

module.exports = (req, res, next) => {
	const { authorization } = req.headers

	if (authorization) {
		try {
			const secret = process.env.JWT_SECRET

			jwt.verify(authorization, secret, (err, decodedToken) => {
				if (err) {
					console.log(err)

					return invalidToken(res)
				} else {
					req.locals = decodedToken

					next()
				}
			})
		} catch (err) {
			console.log(err)

			return invalidToken(res)
		}
	} else {
		return res.status(400).json({ message: 'Please login and try again' })
	}
}
