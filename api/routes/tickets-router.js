const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const Tickets = require('../models/tickets-model');

// GET ticket with replies and devs arrays
router.get('/:id', restricted, (req, res) => {
	Tickets.findTicket(req.params.id).then(ticket => {
		res.status(200).json(ticket);
	});
});

// GET all tickets for specific project
router.get('/by_project/:id', restricted, (req, res) => {
	Tickets.findByProject(req.params.id).then(tickets => {
		res.status(200).json(tickets);
	});
});

// GET all tickets for particular user by username
router.get('/submitted_by/:username', restricted, (req, res) => {
	Tickets.findUserTickets(req.params.username).then(tickets => {
		res.status(200).json(tickets);
	});
});

module.exports = router;
