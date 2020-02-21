const db = require('../../data/dbConfig');

const waitFor = ms => new Promise(r => setTimeout(r, ms));

const findAll = async () => {
	const projects = await db
		.select('projects.*', 'username AS stakeholder')
		.from('projects')
		.join('users', 'users.id', 'projects.stakeholder');

	const devsAndManager = new Promise(resolve => {
		projects.forEach(async (project, i) => {
			const manager = await db
				.select('username')
				.from('users')
				.where('users.id', '=', project.project_manager)
				.first();

			if (manager) projects[i].project_manager = manager.username;

			const devs = await db
				.select('username')
				.from('users')
				.join('project_devs', 'dev_id', 'users.id')
				.where('project_id', '=', project.id);

			project.devs = devs;

			await waitFor(1000);

			resolve();
		});
	});

	await Promise.all([devsAndManager]);

	return projects;
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

	if (project && project.project_manager != null) {
		const manager = await db
			.select('username')
			.from('users')
			.where('users.id', '=', project.project_manager)
			.first();
	
		project.project_manager = manager.username;
	}

	return project && {
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

const joinProject = async (project_id, dev_id) => {
	const alreadyJoined = await db('project_devs')
		.whereRaw('project_id = ? AND dev_id = ?', [project_id, dev_id])
		.where({ dev_id })
		.first();

	if (alreadyJoined) return { message: 'User already joined project' };

	await db('project_devs').insert({ project_id, dev_id });

	return findProjectById(project_id);
};

module.exports = {
	findAll,
	findProjectByName,
	findProjectById,
	addProject,
	deleteProject,
	editProject,
	joinProject
};
