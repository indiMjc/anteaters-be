const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const Tickets = require('../models/tickets-model');

// GET ticket with replies and devs arrays
router.get('/:id', restricted, (req, res) => {
	Tickets.findTicket(req.params.id).then(tickets => {
		res.status(200).json(tickets);
	});
});

module.exports = router;
