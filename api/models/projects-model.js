const db = require('../../data/dbConfig');

const findProjectByName = async name => {
	const project = await db('projects')
		.where(db.raw('LOWER(??)', ['projects.name']), name)
		.first();

	if (project) {
		const devs = await db('project_devs')
			.select('dev_username as username')
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
			
			db.select('dev_username as username')
				.from('project_devs')
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

const editProject = async (id, changes, token) => {
	const { username, isAdmin, superUser } = token;
	const project = await findProjectById(id);

	if (username === project.project_manager || username === project.stakeholder || isAdmin || superUser) {
		await db('projects')
			.where({ id })
			.update(changes);

		return findProjectById(id);
	} else {
		return { message: 'You do not have permission to edit this project' };
	}
};

const deleteProject = async (id, token) => {
	const { username, isAdmin, superUser } = token;
	const { project_manager, stakeholder } = await findProjectById(id);

	if (username === project_manager || username === stakeholder || isAdmin || superUser) {
		return await db('projects')
			.where({ id })
			.del();
	} else {
		return { message: 'You do not have permission to delete this project' };
	}
};

module.exports = { findProjectByName, findProjectById, addProject, deleteProject, editProject };
