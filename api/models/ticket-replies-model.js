const db = require('../../data/dbConfig');

const findAllUsersReplies = async username => {
	return await db
		.select('ticket_replies.*', 'users.username AS submitted_by')
		.from('ticket_replies')
		.join('users', 'ticket_replies.submitted_by', 'users.id')
		.where(db.raw('LOWER(??)', ['users.username']), username)
		.orderBy('ticket_replies.created_at', 'desc');
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

	return db
		.select('ticket_replies.*', 'users.username AS submitted_by')
		.from('ticket_replies')
		.join('users', 'users.id', 'ticket_replies.submitted_by')
		.where('ticket_replies.id', '=', id)
		.first();
};

const deleteReply = async id => {
	return await db('ticket_replies')
		.where({ id })
		.del();
};

module.exports = {
	findAllUsersReplies,
	addReply,
	editReply,
	deleteReply
};
