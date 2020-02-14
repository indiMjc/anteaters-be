const db = require('../../data/dbConfig');

const findByProject = async project_id => {
	const tickets = await db
		.select('tickets.*', 'users.username as submitted_by', 'projects.name as project_id')
		.from('tickets')
		.join('users', 'users.id', 'tickets.submitted_by')
		.join('projects', 'projects.id', 'tickets.project_id')
		.where({ project_id })
		.orderBy('tickets.created_at', 'desc');

	if (tickets.length) {
		return tickets;
	} else {
		return { message: 'No tickets found under this project ID' };
	}
};

// prettier-ignore
const findTicket = async ticket_id => {
		const [ticket, replies, devs] = await Promise.all([
			db.select('tickets.*', 'username as ')
			.from('tickets')
			.where({ id: ticket_id })
			.first(),

			db.select('reply', 'created_at', 'submitted_by')
				.from('ticket_replies')
				.where({ ticket_id }),

			db.select('username')
				.from('users')
				.join('ticket_devs', 'ticket_devs.dev_id', 'users.id')
				.where('ticket_devs.ticket_id', '=', ticket_id)
		]);

		return ticket && {
				...ticket,
				replies,
				devs
		}
};

const findUserTickets = async submitted_by => {
	return await db
		.select('tickets.*')
		.from('tickets')
		.join('users', 'tickets.submitted_by', 'users.username')
		.where(db.raw('LOWER(??)', ['submitted_by']), submitted_by)
		.orderBy('tickets.created_at', 'desc');
};

const editTicket = async (id, changes) => {
	try {
		await db('tickets')
			.where({ id })
			.update(changes);

		return findTicket(id);
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while editing ticket' };
	}
};

const addTicket = async newTicket => {
	const id = await db('tickets')
		.insert(newTicket)
		.returning('id');

	const addedTicket = await findTicket(id[0]);

	return addedTicket;
};

const deleteTicket = async id => {
	return await db('tickets')
		.where({ id })
		.del();
};

const findRepliesByUsername = submitted_by => {
	return db
		.select('ticket_replies.*')
		.from('ticket_replies')
		.join('users', 'ticket_replies.submitted_by', 'users.username')
		.where(db.raw('LOWER(??)', ['users.username']), submitted_by);
};

module.exports = {
	findByProject,
	findTicket,
	findUserTickets,
	editTicket,
	addTicket,
	deleteTicket,
	findRepliesByUsername
};
