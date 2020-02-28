const Projects = require('../models/projects-model')

module.exports = async (req, res, next) => {
	if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' })

	try {
		const project = await Projects.findProjectById(req.params.id)
		const { uid, isAdmin, superUser } = req.locals

		// only allow edit if user is the stakeholder, project manager, admin or superUser
		return uid == project.stakeholder || uid == project.project_manager || isAdmin || superUser
			? next()
			: res.status(400).json({ message: 'Sorry, you do not have permission to edit this project' })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ errMessage: 'Error while validating permissions' })
	}
}
