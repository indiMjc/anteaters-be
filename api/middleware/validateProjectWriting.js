const Projects = require('../models/projects-model');

const validateEdit = async (req, res, next) => {
	try {
		const project = await Projects.findProjectById(req.params.id);
		const { uid, isAdmin, superUser } = req.locals;

		if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' });

		return uid === project.stakeholder || uid === project.project_manager || superUser || isAdmin
			? next()
			: res.status(400).json({ message: 'Sorry, you do not have permission to edit this project' });
	} catch (err) {
		console.log(err);
	}
};

const validateDelete = async (req, res, next) => {
	try {
		const project = await Projects.findProjectById(req.params.id);
		const { uid, isAdmin, superUser } = req.locals;

		if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' });

		return uid === project.stakeholder || uid === project.project_manager || superUser || isAdmin
			? next()
			: res.status(400).json({ errMessage: 'Sorry, you do not have permission to delete this project' });
	} catch (err) {
		console.log(err);
	}
};

module.exports = { validateEdit, validateDelete };
