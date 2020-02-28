const Tickets = require('../models/tickets-model')

// prettier-ignore
// return true if user is ticket author, project stakeholder, project manager, admin or superUser
const ifUserHasPermission = (token, ticket) => {
	const { uid, isAdmin, superUser } = token
	const { submitted_by, stakeholder, project_manager } = ticket

	return uid == submitted_by 
		|| uid == stakeholder 
		|| uid == project_manager 
		|| isAdmin 
		|| superUser
}

module.exports = async (req, res, next) => {
	if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' })

	try {
		const ticket = Tickets.findTicket(req.params.id)

		return ifUserHasPermission(req.locals, ticket)
			? next()
			: res.status(400).json({ message: 'Sorry, you do not have permission to edit this ticket' })
	} catch (error) {
		return res.status(500).json({ errMessage: 'Error while validating permissions', error })
	}
}
