const db = require('../../data/dbConfig');

const findProjectByName = async name => {
	try {
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
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while fetching project by ID' };
	}
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
		return { errMessage: 'Error in db function while fetching project by ID' }
	}
};

const addProject = async newProject => {
	try {
		const id = await db('projects')
			.insert(newProject)
			.returning('id');

		const addedProject = await findProjectById(id[0]);

		return addedProject;
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while adding new project' };
	}
};

const editProject = async (id, changes) => {
	try {
		await db('projects')
			.where({ id })
			.update(changes);

		return findProjectById(id);
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function editing project' };
	}
};

const deleteProject = async id => {
	try {
		return await db('projects')
			.where({ id })
			.del();
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while deleting project' };
	}
};

module.exports = { findProjectByName, findProjectById, addProject, deleteProject, editProject };
