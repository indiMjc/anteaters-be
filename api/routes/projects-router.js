const router = require('express').Router();

const { validateEditProject, validateDeleteProject } = require('../middleware');

const Projects = require('../models/projects-model');

// GET - all projects
router.get('/', async (req, res) => {
	try {
		const projects = await Projects.findAll();

		res.status(200).json(projects);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while getting projects' });
	}
});

// GET - search for project by name, case insensitive
router.get('/name_search/:name', async (req, res) => {
	try {
		const project = await Projects.findProjectByName(req.params.name);

		project ? res.status(200).json(project) : res.status(401).json({ message: 'No project by that name' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while searching for project' });
	}
});

// GET - fetches projects with array of assigned devs
router.get('/id_search/:id', async (req, res) => {
	try {
		const project = await Projects.findProjectById(req.params.id);

		project ? res.status(200).json(project) : res.status(401).json({ message: 'No project with that ID' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error getting project' });
	}
});

// POST - add new project
router.post('/', async (req, res) => {
	try {
		const project = await Projects.addProject(req.body);

		res.status(500).json(project);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while adding new project' });
	}
});

// PUT - edit project
router.put('/:id', validateEditProject, async (req, res) => {
	try {
		const project = await Projects.editProject(req.params.id, req.body, req.locals);

		res.status(200).json(project);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Edit project failed' });
	}
});

// DELETE - delete project
router.delete('/:id', validateDeleteProject, async (req, res) => {
	try {
		const deleted = await Projects.deleteProject(req.params.id, req.locals);

		deleted
			? res.status(200).json({ removed: deleted })
			: res.status(404).json({ errMessage: 'Could not find project with given ID' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Could not find project with given ID' });
	}
});

module.exports = router;
