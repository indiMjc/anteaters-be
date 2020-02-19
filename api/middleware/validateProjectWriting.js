const Projects = require('../models/projects-model');

const checkPermission = (project, token, res, next) => {
	const { uid, isAdmin, superUser } = token;
	return uid === project.stakeholder || uid === project.project_manager || superUser || isAdmin || uid === 1
		? next()
		: res.status(400).json({ message: 'Sorry, you do not have permission to edit this project' });
};

const validateEdit = async (req, res, next) => {
	try {
		const project = await Projects.findProjectById(req.params.id);

		if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' });

		return checkPermission(project, req.locals, res, next);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMessage: 'Error while validating permissions' });
	}
};

const validateDelete = async (req, res, next) => {
	try {
		const project = await Projects.findProjectById(req.params.id);

		if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' });

		return checkPermission(project, req.locals, res, next);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMessage: 'Error while validating permissions' });
	}
};

module.exports = { validateEdit, validateDelete };
