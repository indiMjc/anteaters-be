const db = require('../../data/dbConfig');

const findAllUsersReplies = async id => {
	return await db
		.select('ticket_replies.*', 'username AS submitted_by', 'tickets.title AS ticket_id')
		.from('ticket_replies')
		.join('users', 'users.id', 'ticket_replies.submitted_by')
		.join('tickets', 'tickets.id', 'ticket_replies.ticket_id')
		.where('ticket_replies.submitted_by', '=', id)
		.orderBy('ticket_replies.created_at', 'desc');
};

const findById = async id => {
	return await db
		.select('ticket_replies.*', 'users.username AS submitted_by')
		.from('ticket_replies')
		.join('users', 'users.id', 'ticket_replies.submitted_by')
		.where('ticket_replies.id', '=', id)
		.first();
};

const addReply = async reply => {
	const id = await db('ticket_replies')
		.insert(reply)
		.returning('id');

	return findById(id[0]);
};

const editReply = async (id, changes) => {
	await db('ticket_replies')
		.where({ id })
		.update(changes);

	return findById(id);
};

const deleteReply = async id => {
	return await db('ticket_replies')
		.where({ id })
		.del();
};

module.exports = {
	findAllUsersReplies,
	findById,
	addReply,
	editReply,
	deleteReply
};
