const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const Projects = require('../models/projects-model');

// GET - search for project by name, case insensitive
router.get('/name_search/:name', restricted, (req, res) => {
	Projects.findProjectByName(req.params.name)
		.then(project => {
			project
				? res.status(200).json(project)
				: res.status(401).json({ message: 'No project by that name' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while searching for project' });
		});
});

// GET - fetches projects with array of assigned devs
router.get('/id_search/:id', restricted, (req, res) => {
	Projects.findProjectById(req.params.id)
		.then(project => {
			project
				? res.status(200).json(project)
				: res.status(401).json({ message: 'No project with that ID' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Error getting project' });
		});
});

// POST - add new project
router.post('/', restricted, (req, res) => {
	Projects.addProject(req.body)
		.then(project => {
			res.status(200).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while adding new project' });
		});
});

module.exports = router;
