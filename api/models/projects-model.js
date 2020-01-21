const db = require('../../data/dbConfig');

const findProjectByName = async name => {
	const project = await db('projects')
		.where(db.raw('LOWER(??)', ['projects.name']), name)
		.first();

	const devs = await db('project_devs')
		.select('dev_username as username')
		.where({ project_id: project.id });

	return {
		...project,
		devs
	};
};

// prettier-ignore
const findProjectById = async id => {
	try {		
		const [project, devs] = await Promise.all([
			db('projects').where({ id }).first(),
			
			db.select('dev_username as username')
				.from('project_devs')
				.where({ project_id: id })
		]);

		return project && {
				...project,
				devs
		};
	}
	catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while querying db for project by ID', err })
	}
};

module.exports = { findProjectByName, findProjectById };
