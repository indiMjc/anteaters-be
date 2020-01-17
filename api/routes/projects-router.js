const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const Projects = require('../models/projects-model');

router.get('/:id', restricted, (req, res) => {
	Projects.findProjectById(req.params.id)
		.then(project => {
			project
				? res.status(200).json(project)
				: res
						.status(401)
						.json({ message: 'Could not find project with that id' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Error getting project' });
		});
});

router.get('/search/:query', restricted, (req, res) => {
	console.log('params', req.params.query);
	Projects.findProjectBy({ lowercase_name: req.params.query })
		.then(project => {
			project && delete project.lowercase_name;
			project
				? res.status(200).json(project)
				: res.status(401).json({ message: 'No project by that name' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Error while searching for project' });
		});
});

module.exports = router;
