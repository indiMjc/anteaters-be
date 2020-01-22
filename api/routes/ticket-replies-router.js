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

// GET - fetches all replies submitted by username
router.get('/my_replies/:username', (req, res) => {
	Replies.findAllUsersReplies(req.params.username)
		.then(replies => {
			res.status(200).json(replies);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while fetching replies' });
		});
});

router.post('/', (req, res) => {
	Replies.addReply(req.body)
		.then(reply => {
			res.status(200).json(reply);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while adding reply' });
		});
});

module.exports = router;
