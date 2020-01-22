const db = require('../../data/dbConfig');

const findAllUsersReplies = () => {};

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
				.select('ticket_devs.*')
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
