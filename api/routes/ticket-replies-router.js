const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const Replies = require('../models/ticket-replies-model');

// GET - fetches all ticket replies and devs assigned to ticket
router.get('/:id', (req, res) => {
	Replies.findAllTicketsReplies(req.params.id)
		.then(replies => {
			res.status(200).json(replies);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while fetching replies' });
		});
});

module.exports = router;
