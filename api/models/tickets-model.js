const db = require('../../data/dbConfig');

const findByProject = id => {
	return db
		.select('tickets.*', 'users.username as author')
		.from('tickets')
		.join('users', 'users.id', 'tickets.submitted_by')
		.join('projects', 'projects.id', 'tickets.project_id')
		.where({ project_id: id })
		.orderBy('tickets.created_at', 'desc');
};

const findRepliesByTicket = id => {
	return db('ticket_replies').where({ ticket_id: id });
};

const findTicketById = id => {
	return db('tickets')
		.where({ id })
		.first();
};

const findTicketWithReplies = id => {
	return findTicketById(id).then(ticket => {
		return db('ticket_replies')
			.where({ ticket_id: id })
			.then(replies => {
				return {
					...ticket,
					replies
				};
			});
	});
};

const findTicketDevs = ticket_id => {
	return db('ticket_devs').where({ ticket_id });
};

module.exports = { findByProject, findRepliesByTicket, findTicketWithReplies, findTicketDevs };
