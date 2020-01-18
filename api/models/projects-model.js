const db = require('../../data/dbConfig');

const findProjectBy = filter => {
	return db('projects')
		.where(filter)
		.first();
};

// prettier-ignore
const findProject = async id => {
	const [project, devs] = await Promise.all([
		db('projects').where({ id }).first(),
		db
			.select('project_devs.dev_username')
			.from('project_devs')
			.where({ project_id: id })
	]);

	return project && {
			...project,
			devs
		};
};

module.exports = { findProjectBy, findProject };
