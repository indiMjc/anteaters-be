const db = require('../../data/dbConfig');

const findByProject = project_id => {
	return db
		.select('tickets.*', 'users.username as author')
		.from('tickets')
		.join('users', 'users.id', 'tickets.submitted_by')
		.join('projects', 'projects.id', 'tickets.project_id')
		.where({ project_id })
		.orderBy('tickets.created_at', 'desc');
};

// prettier-ignore
const findTicket = async ticket_id => {
	const [ticket, replies, devs] = await Promise.all([
		db('tickets').where({ id: ticket_id }).first(),
		db
			.select(
				'ticket_replies.reply', 
				'ticket_replies.created_at', 
				'ticket_replies.submitted_by'
			)
			.from('ticket_replies')
			.where({ ticket_id }),
		db
			.select('ticket_devs.dev_username as username')
			.from('ticket_devs')
			.where({ ticket_id })
	]);

	return ticket && {
			...ticket,
			replies,
			devs
		};
};

module.exports = { findByProject, findTicket };
