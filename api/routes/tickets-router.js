const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const restrictUsers = require('../middleware/validateUsers');

const Tickets = require('../models/tickets-model');

// GET - fetch ticket with replies and devs arrays
router.get('/:id', restricted, (req, res) => {
	Tickets.findTicket(req.params.id)
		.then(ticket => {
			res.status(200).json(ticket);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while fetching ticket' });
		});
});

// GET - fetch all tickets for specific project
router.get('/by_project/:id', restricted, (req, res) => {
	Tickets.findByProject(req.params.id)
		.then(tickets => {
			res.status(200).json(tickets);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while fecthing project tickets' });
		});
});

// GET - fetch all tickets for particular user by username
router.get('/submitted_by/:username', restricted, (req, res) => {
	Tickets.findUserTickets(req.params.username)
		.then(tickets => {
			res.status(200).json(tickets);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while fecthing user tickets' });
		});
});

// GET - fetch all replies by username
router.get('/replies/:username', restricted, (req, res) => {
	Tickets.findRepliesByUsername(req.params.username)
		.then(replies => {
			replies.length
				? res.status(200).json(replies)
				: res.status(404).json({ message: 'No replies for this user' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Error while fetching user replies' });
		});
});

// PUT - edit ticket, only accessible to superusers, admins and author of the ticket
router.put('/:id', restricted, restrictUsers.validateEditTicket, (req, res) => {
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

// DELETE - remove ticket by ID
router.delete('/:id', restricted, (req, res) => {
	Tickets.deleteTicket(req.params.id)
		.then(deleted => {
			deleted
				? res.status(200).json({ removed: deleted })
				: res.status(404).json({ errMessage: 'Could not find ticket with given ID' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errMessage: 'Delete ticket failed' });
		});
});

module.exports = router;
