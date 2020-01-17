const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const Tickets = require('../models/tickets-model');

// Get ticket by project ID
router.get('/:id', restricted, (req, res) => {
	Tickets.findByProject(req.params.id).then(tickets => {
		res.status(200).json(tickets);
	});
});

// Get replies for ticket by ticket ID
router.get('/:id/replies', restricted, (req, res) => {
	Tickets.findRepliesByTicket(req.params.id).then(replies => {
		res.status(200).json(replies);
	});
});

// Get ticket with nested replies array
router.get('/:id/with_replies', restricted, (req, res) => {
	Tickets.findTicketWithReplies(req.params.id).then(ticket => {
		res.status(200).json(ticket);
	});
});

module.exports = router;
