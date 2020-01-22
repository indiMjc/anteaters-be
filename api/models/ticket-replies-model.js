const db = require('../../data/dbConfig');

const findAllUsersReplies = async username => {
	try {
		return await db
			.select('ticket_replies.*')
			.from('ticket_replies')
			.join('users', 'ticket_replies.submitted_by', 'users.username')
			.where(db.raw('LOWER(??)', ['username']), username)
			.orderBy('ticket_replies.created_at', 'desc');
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while getting replies for user' };
	}
};

const findAllTicketsReplies = async id => {
	try {
		let [replies, devs] = await Promise.all([
			db
				.select('ticket_replies.*')
				.from('ticket_replies')
				.join('tickets', 'tickets.id', 'ticket_replies.ticket_id')
				.whereRaw('tickets.id = ?', [id])
				.orderBy('ticket_replies.created_at', 'desc'),

			db
				.select('ticket_devs.dev_username AS username')
				.from('ticket_devs')
				.join('tickets', 'tickets.id', 'ticket_devs.ticket_id')
				.whereRaw('tickets.id = ?', [id])
		]);

		if (!replies.length) {
			replies = 'No replies yet';

			return {
				replies,
				devs
			};
		} else {
			return {
				...replies,
				devs
			};
		}
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while fetching ticket replies' };
	}
};

const addReply = async reply => {
	try {
		const id = await db('ticket_replies')
			.insert(reply)
			.returning('id');

		const replied = await db('ticket_replies')
			.where({ id: id[0] })
			.first();

		return replied;
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while adding reply' };
	}
};

const editReply = () => {};

const deleteReply = async id => {
	try {
		return await db('ticket_replies')
			.where({ id })
			.del();
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while deleting reply' };
	}
};

module.exports = {
	findAllUsersReplies,
	findAllTicketsReplies,
	addReply,
	editReply,
	deleteReply
};
