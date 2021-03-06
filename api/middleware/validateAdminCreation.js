const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const { authorization } = req.headers

	if (authorization) {
		try {
			const secret = process.env.JWT_SECRET

			jwt.verify(authorization, secret, (err, decodedToken) => {
				if (err) {
					console.log(err)

					return res.status(401).json({ errMessage: 'Invalid token' })
				} else {
					const { superUser, uid } = decodedToken

					if (superUser || uid == 1) return next()

					return res.status(401).json({ errMessage: 'Sorry, you do not have permission' })
				}
			})
		} catch (err) {
			console.log(err)

			return res.status(401).json({ errMessage: 'Cannot find token' })
		}
	}
}
