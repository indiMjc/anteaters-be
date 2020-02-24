const Replies = require('../models/ticket-replies-model')

// only allow edit if user is reply author, admin or superUser
const ifUserHasPermission = (token, reply) => {
	const { username, isAdmin, superUser } = token

	return username == reply.submitted_by || isAdmin || superUser
}

module.exports = async (req, res, next) => {
	if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' })

	try {
		const reply = await Replies.findById(req.params.id)

		return ifUserHasPermission(req.locals, reply)
			? next()
			: res.status(400).json({ message: 'Sorry, you do not have permission to edit this reply' })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ errMessage: 'Error while validating permissions' })
	}
}
