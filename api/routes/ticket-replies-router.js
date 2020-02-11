const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const restrictUsers = require('../middleware/validateUsers');

const Replies = require('../models/ticket-replies-model');

// GET - fetches all ticket replies and devs assigned to ticket
router.get('/:id', restricted, async (req, res) => {
	try {
		const replies = await Replies.findAllTicketsReplies(req.params.id);

		res.status(200).json(replies);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while fetching replies' });
	}
});

// GET - fetches all replies submitted by user id
router.get('/my_replies/:id', restricted, async (req, res) => {
	try {
		const replies = await Replies.findAllUsersReplies(req.params.id);

		res.status(200).json(replies);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while fetching replies' });
	}
});

// POST - add reply
router.post('/', restricted, async (req, res) => {
	try {
		const reply = await Replies.addReply(req.body);

		res.status(200).json(reply);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while adding reply' });
	}
});

// DELETE - remove reply by ID
router.delete('/:id', restricted, async (req, res) => {
	try {
		const deleted = await Replies.deleteReply(req.params.id);

		deleted
			? res.status(200).json({ removed: deleted })
			: res.status(401).json({ errMessage: 'Could not find reply with given ID' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Delete reply failed' });
	}
});

// PUT - edit reply
router.put('/:id', restricted, async (req, res) => {
	try {
		const edited = await Replies.editReply(req.params.id, req.body);

		res.status(200).json(edited);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while editing ticket' });
	}
});

module.exports = router;
