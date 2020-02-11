const db = require('../../data/dbConfig');

const findAllUsersReplies = async id => {
	return await db
		.select('ticket_replies.*', 'users.username')
		.from('ticket_replies')
		.join('users', 'ticket_replies.submitted_by', 'users.id')
		.where(db.raw('??', ['users.id']), id)
		.orderBy('ticket_replies.created_at', 'desc');
};

const findAllTicketsReplies = async id => {
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
};

const addReply = async reply => {
	const id = await db('ticket_replies')
		.insert(reply)
		.returning('id');

	const replied = await db('ticket_replies')
		.where({ id: id[0] })
		.first();

	return replied;
};

const editReply = async (id, changes) => {
	await db('ticket_replies')
		.where({ id })
		.update(changes);

	return db('ticket_replies')
		.where({ id })
		.first();
};

const deleteReply = async id => {
	return await db('ticket_replies')
		.where({ id })
		.del();
};

module.exports = {
	findAllUsersReplies,
	findAllTicketsReplies,
	addReply,
	editReply,
	deleteReply
};
