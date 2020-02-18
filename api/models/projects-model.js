const db = require('../../data/dbConfig');

const findAll = () => {
	return db('projects');
};

// prettier-ignore
const findProjectByName = async name => {
	const project = await db
		.select('projects.*', 'username AS stakeholder')
		.from('projects')
		.join('users', 'users.id', 'projects.stakeholder')
		.where(db.raw('LOWER(??)', ['projects.name']), name)
		.first();

	if (project) {
		const [devs, manager] = await Promise.all([
			db.select('username')
				.from('users')
				.join('project_devs', 'dev_id', 'users.id')
				.where({ project_id: project.id }),

			db.select('username')
				.from('users')
				.where('users.id', '=', project.project_manager)
				.first()
		]);

		project.project_manager = manager.username;

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
		db.select('projects.*', 'username AS stakeholder')
			.from('projects')
			.join('users', 'users.id', 'projects.stakeholder')
			.where('projects.id', '=', id)
			.first(),

		db.select('username')
			.from('users')
			.join('project_devs', 'dev_id', 'users.id')
			.where({ project_id: id })
	]);

	const manager = await db
		.select('username')
		.from('users')
		.where('users.id', '=', project.project_manager)
		.first();

	project.project_manager = manager.username;

	return {
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

const deleteProject = async id => {
	return await db('projects')
		.where({ id })
		.del();
};

module.exports = { findAll, findProjectByName, findProjectById, addProject, deleteProject, editProject };
