const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const Projects = require('../models/projects-model');

// Search for project by name, case insensitive
router.get('/name_search/:name', restricted, (req, res) => {
	Projects.findProjectByName(req.params.name)
		.then(project => {
			project
				? res.status(200).json(project)
				: res.status(401).json({ message: 'No project by that name' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Error while searching for project' });
		});
});

// GET projects with array of assigned devs
router.get('/id_search/:id', restricted, (req, res) => {
	Projects.findProjectById(req.params.id)
		.then(project => {
			project
				? res.status(200).json(project)
				: res.status(401).json({ message: 'Could not find project' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Error getting project' });
		});
});

module.exports = router;
