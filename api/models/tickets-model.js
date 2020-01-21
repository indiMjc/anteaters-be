const db = require('../../data/dbConfig');

const findByProject = project_id => {
	return db
		.select('tickets.*', 'users.username as author')
		.from('tickets')
		.join('users', 'users.username', 'tickets.submitted_by')
		.join('projects', 'projects.id', 'tickets.project_id')
		.where({ project_id })
		.orderBy('tickets.created_at', 'desc');
};

// prettier-ignore
const findTicket = async ticket_id => {
	try {		
		const [ticket, replies, devs] = await Promise.all([
			db('tickets').where({ id: ticket_id }).first(),

			db.select('ticket_replies.reply', 'ticket_replies.created_at', 'ticket_replies.submitted_by')
				.from('ticket_replies')
				.where({ ticket_id }),

			db.select('ticket_devs.dev_username as username')
				.from('ticket_devs')
				.where({ ticket_id })
		]);

		return ticket && {
				...ticket,
				replies,
				devs
		}
	}
	catch (err) {
		console.log(err);
		return res.status(500).json({ errMessage: 'Error while querying db for ticket by ID' })
	}
};

const findUserTickets = submitted_by => {
	return db
		.select('tickets.*')
		.from('tickets')
		.join('users', 'tickets.submitted_by', 'username')
		.where({ submitted_by });
};

const editTicket = async (id, changes) => {
	await db('tickets')
		.where({ id })
		.update(changes);

	return db('tickets')
		.where({ id })
		.first();
};

module.exports = { findByProject, findTicket, findUserTickets, editTicket };
