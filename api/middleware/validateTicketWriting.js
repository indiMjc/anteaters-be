const Tickets = require('../models/tickets-model')

// prettier-ignore
// only allow edit ticket if user is author, stakeholder, project manager, admin or superUser
const ifUserHasPermission = (token, ticket) => {
	const { uid, isAdmin, superUser} = token

	return uid == ticket.submitted_by 
		|| uid == ticket.stakeholder 
		|| uid == ticket.project_manager 
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
	} catch (err) {
		console.log(err)
		return res.status(500).json({ errMessage: 'Error while validating permissions' })
	}
}
