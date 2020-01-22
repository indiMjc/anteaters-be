const db = require('../../data/dbConfig');

const findAllUsersReplies = () => {};

const findAllTicketsReplies = async id => {
	try {
		const replies = await db
			.select('ticket_replies.*', 'ticket_devs.dev_username AS username')
			.from('ticket_replies')
			.join('ticket_devs', 'ticket_replies.ticket_id', 'ticket_devs.ticket_id')
			.join('tickets', 'ticket_replies.ticket_id', 'tickets.id')
			.where({ id })
			.orderBy('ticket_replies.created_at', 'desc');

		return replies.length ? replies : { message: 'No replies for this ticket yet' };
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while fetching ticket replies' };
	}
};

const findRepliesByProjectId = () => {};

const addReply = () => {};

const editReply = () => {};

const deleteReply = () => {};

module.exports = {
	findAllUsersReplies,
	findAllTicketsReplies,
	findRepliesByProjectId,
	addReply,
	editReply,
	deleteReply
};
