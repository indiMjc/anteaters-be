const db = require('../../data/dbConfig');

const findProjectByName = async name => {
	const project = await db('projects')
		.where(db.raw('LOWER(??)', ['projects.name']), name)
		.first();

	if (project) {
		const devs = await db
			.select('username')
			.from('users')
			.join('project_devs', 'dev_id', 'users.id')
			.where({ project_id: project.id });

		return {
			...project,
			devs
		};
	} else {
		return { message: 'No project found by that name' };
	}
};

// prettier-ignore
const findProjectById = async id => {
		const [project, devs] = await Promise.all([
			db('projects')
				.where({ id })
				.first(),
			
			db.select('username')
				.from('users')
				.join('project_devs', 'dev_id', 'users.id')
				.where({ project_id: id })
		]);

		return  {
			...project,
			devs
		};
};

const addProject = async newProject => {
	const id = await db('projects')
		.insert(newProject)
		.returning('id');

	const addedProject = await findProjectById(id[0]);

	return addedProject;
};

const editProject = async (id, changes) => {
	await db('projects')
		.where({ id })
		.update(changes);

	return findProjectById(id);
};

const deleteProject = async (id, token) => {
	return await db('projects')
		.where({ id })
		.del();
};

module.exports = { findProjectByName, findProjectById, addProject, deleteProject, editProject };
