const db = require('../../data/dbConfig');

const Users = require('./users-model');

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

// prettier-ignore
// const findTicket = async ticket_id => {
// 	const ticket = await db('tickets').where({ id: ticket_id }).first();
// 	const replies = await db('ticket_replies').where({ ticket_id });
// 	const devIds = await db('ticket_devs').where({ ticket_id });

// 	return ticket && {
// 		...ticket,
// 		replies,
// 		devIds
// 	};
// };

const findTicket = async ticket_id => {
	const [ticket, replies, devs] = await Promise.all([
		db('tickets').where({ id: ticket_id }).first(),
		db('ticket_replies').where({ ticket_id }),
		db('ticket_devs').where({ ticket_id })
	])

	return ticket && {
		...ticket,
		replies,
		devs
	}
}

const findById = id => {
	return db('users')
		.where({ id })
		.first();
};

const findTicketDevs = ticket_id => {
	return db('ticket_devs').where({ ticket_id });
};

module.exports = { findByProject, findRepliesByTicket, findTicket, findTicketDevs };
