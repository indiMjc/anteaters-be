const Replies = require('../models/ticket-replies-model');

const validateEditReply = async (req, res, next) => {
	if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' });

	const { uid, isAdmin, superUser } = req.locals;
	try {
		const reply = Replies.findById(req.params.id);

		return uid == reply.submitted_by || isAdmin || superUser
			? next()
			: res.status(400).json({ message: 'Sorry, you do not have permission to edit this reply' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMessage: 'Error while validating permissions' });
	}
};

module.exports = { validateEditReply };
