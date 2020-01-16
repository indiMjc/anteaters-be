const db = require('../../data/dbConfig');

const findByProjectId = id => {
	return db
		.select('tickets.*', 'users.username as author')
		.from('tickets')
		.join('users', 'users.id', 'tickets.submitted_by')
		.join('projects', 'projects.id', 'tickets.project_id')
		.where({ project_id: id })
		.orderBy('tickets.created_at', 'desc');
};

module.exports = { findByProjectId };
