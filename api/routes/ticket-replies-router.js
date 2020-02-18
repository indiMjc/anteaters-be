const router = require('express').Router();

const Replies = require('../models/ticket-replies-model');

// GET - fetches all replies submitted by username
router.get('/my_replies/:username', async (req, res) => {
	try {
		const replies = await Replies.findAllUsersReplies(req.params.username.toLowerCase());

		res.status(200).json(replies);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while fetching replies' });
	}
});

// POST - add reply
router.post('/', async (req, res) => {
	try {
		const reply = await Replies.addReply(req.body);

		res.status(200).json(reply);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while adding reply' });
	}
});

// DELETE - remove reply by ID
router.delete('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
	try {
		const edited = await Replies.editReply(req.params.id, req.body);

		res.status(200).json(edited);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while editing ticket' });
	}
});

module.exports = router;
