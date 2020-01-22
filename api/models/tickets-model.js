const db = require('../../data/dbConfig');

const findByProject = async project_id => {
	try {
		const tickets = await db
			.select('tickets.*')
			.from('tickets')
			.join('users', 'users.username', 'tickets.submitted_by')
			.join('projects', 'projects.id', 'tickets.project_id')
			.where({ project_id })
			.orderBy('tickets.created_at', 'desc');

		if (tickets.length) {
			return tickets;
		} else {
			return { message: 'No tickets found under this project ID' };
		}
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while fetching project' };
	}
};

// prettier-ignore
const findTicket = async ticket_id => {
	try {		
		const [ticket, replies, devs] = await Promise.all([
			db('tickets').where({ id: ticket_id }).first(),

			db.select('reply', 'created_at', 'submitted_by')
				.from('ticket_replies')
				.where({ ticket_id }),

			db.select('dev_username as username')
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
		return { errMessage: 'Error in db function while fetching ticket by ID' }
	}
};

const findUserTickets = async submitted_by => {
	try {
		return await db
			.select('tickets.*')
			.from('tickets')
			.join('users', 'tickets.submitted_by', 'users.username')
			.where(db.raw('LOWER(??)', ['submitted_by']), submitted_by)
			.orderBy('tickets.created_at', 'desc');
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while searching for user' };
	}
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
	try {
		const id = await db('tickets')
			.insert(newTicket)
			.returning('id');

		const addedTicket = await findTicket(id[0]);

		return addedTicket;
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while adding new ticket' };
	}
};

const deleteTicket = async id => {
	try {
		return await db('tickets')
			.where({ id })
			.del();
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while deleting ticket' };
	}
};

const findRepliesByUsername = submitted_by => {
	try {
		return db
			.select('ticket_replies.*')
			.from('ticket_replies')
			.join('users', 'ticket_replies.submitted_by', 'users.username')
			.where(db.raw('LOWER(??)', ['users.username']), submitted_by);
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while fetching replies' };
	}
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
