const db = require('../../data/dbConfig');

const findProjectByName = name => {
	return db('projects')
		.where(db.raw('LOWER(??)', ['projects.name']), name)
		.first();
};

// prettier-ignore
const findProject = async id => {
	const [project, devs] = await Promise.all([
		db('projects').where({ id }).first(),
		
		db
			.select('project_devs.dev_username as username')
			.from('project_devs')
			.where({ project_id: id })
	]);

	return project && {
			...project,
			devs
		};
};

module.exports = { findProjectByName, findProject };
