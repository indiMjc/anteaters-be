const db = require('../../data/dbConfig');

const findByProject = async project_id => {
	const tickets = await db
		.select('tickets.*', 'users.username AS submitted_by', 'projects.name as project_id')
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
	let [ticket, replies, devs] = await Promise.all([
		db.select('tickets.*', 'users.username AS submitted_by', 'projects.name AS project_name')
			.from('tickets')
			.join('users', 'users.id', 'tickets.submitted_by')
			.join('projects', 'projects.id', 'tickets.project_id')
			.where('tickets.id', '=', ticket_id)
			.first(),

		db.select('ticket_replies.*', 'users.username AS submitted_by')
			.from('ticket_replies')
			.join('users', 'users.id', 'ticket_replies.submitted_by')
			.where({ ticket_id }),

		db.select('username')
			.from('users')
			.join('ticket_devs', 'ticket_devs.dev_id', 'users.id')
			.where({ ticket_id })
	]);

	if (!devs.length) devs = [{ username: 'No devs joined this ticket yet' }];

	if (!replies.length)
		replies = [
			{
				id: null,
				reply: 'No replies yet',
				created_at: null,
				ticket_id: null,
				submitted_by: null
			}
		];

	return ticket && {
			...ticket,
			replies,
			devs
		};
};

const editTicket = async (id, changes) => {
	await db('tickets')
		.where({ id })
		.update(changes);

	return findTicket(id);
};

const addTicket = async newTicket => {
	const id = await db('tickets')
		.insert(newTicket)
		.returning('id');

	return await findTicket(id[0]);
};

const findUserTickets = async submitted_by => {
	return await db
		.select('tickets.*')
		.from('tickets')
		.join('users', 'tickets.submitted_by', 'users.username')
		.where(db.raw('LOWER(??)', ['submitted_by']), submitted_by)
		.orderBy('tickets.created_at', 'desc');
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

const joinTicket = async (ticket_id, dev_id) => {
	const alreadyJoined = await db('ticket_devs')
		.whereRaw('ticket_id = ? AND dev_id = ?', [ticket_id, dev_id])
		.first();

	if (alreadyJoined) return { message: 'User already joined ticket' };

	await db('ticket_devs').insert({ ticket_id, dev_id });

	return findTicket(ticket_id);
};

module.exports = {
	findByProject,
	findTicket,
	findUserTickets,
	editTicket,
	addTicket,
	deleteTicket,
	findRepliesByUsername,
	joinTicket
};
