const Replies = require('../models/ticket-replies-model');

const checkPermission = (reply, token, res, next) => {
	const { uid, isAdmin, superUser } = token;
	return uid === reply.submitted_by || isAdmin || superUser || uid === 1
		? next()
		: res.status(400).json({ message: 'Sorry, you do not have permission to edit this reply' });
};

const validateEditReply = async (req, res, next) => {
	try {
		const reply = Replies.findById(req.params.id);

		if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' });

		return checkPermission(reply, req.locals, res, next);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMessage: 'Error while validating permissions' });
	}
};

const validateDeleteReply = async (req, res, next) => {
	try {
		const reply = Replies.findById(req.params.id);

		if (!req.locals) return res.status(400).json({ message: 'Could not find credentials' });

		return checkPermission(reply, req.locals, res, next);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMessage: 'Error while validating permissions' });
	}
};

module.exports = { validateEditReply, validateDeleteReply };
