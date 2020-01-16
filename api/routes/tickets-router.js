const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const Tickets = require('../models/tickets-model');

router.get('/:id', restricted, (req, res) => {
	Tickets.findByProject(req.params.id).then(tickets => {
		res.status(200).json(tickets);
	});
});

router.get('/:id/replies', restricted, (req, res) => {
	Tickets.findRepliesByTicket(req.params.id).then(replies => {
		res.status(200).json(replies);
	});
});

module.exports = router;
