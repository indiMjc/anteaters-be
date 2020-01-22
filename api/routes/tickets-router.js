const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const restrictUsers = require('../middleware/validateUsers');

const Tickets = require('../models/tickets-model');

// GET - fetch ticket with replies and devs arrays
router.get('/:id', restricted, (req, res) => {
	Tickets.findTicket(req.params.id).then(ticket => {
		res.status(200).json(ticket);
	});
});

// GET - fetch all tickets for specific project
router.get('/by_project/:id', restricted, (req, res) => {
	Tickets.findByProject(req.params.id).then(tickets => {
		res.status(200).json(tickets);
	});
});

// GET - fetch all tickets for particular user by username
router.get('/submitted_by/:username', restricted, (req, res) => {
	Tickets.findUserTickets(req.params.username).then(tickets => {
		res.status(200).json(tickets);
	});
});

// PUT - edit ticket, only accessible to superusers, admins and author of the ticket
router.put('/edit/:id', restricted, restrictUsers.validateEditCredentials, (req, res) => {
	const { id } = req.params;
	Tickets.editTicket(id, req.body)
		.then(ticket => {
			res.status(200).json(ticket);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Edit ticket failed' });
		});
});

// POST - add ticket
router.post('/', restricted, (req, res) => {
	Tickets.addTicket(req.body)
		.then(ticket => {
			res.status(200).json(ticket);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Add ticket failed' });
		});
});

module.exports = router;
