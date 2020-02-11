const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const restrictUsers = require('../middleware/validateUsers');

const Tickets = require('../models/tickets-model');

// GET - fetch ticket with replies and devs arrays
router.get('/:id', restricted, async (req, res) => {
	try {
		const ticket = await Tickets.findTicket(req.params.id);

		res.status(200).json(ticket);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while fetching ticket' });
	}
});

// GET - fetch all tickets for specific project
router.get('/by_project/:id', restricted, async (req, res) => {
	try {
		const tickets = await Tickets.findByProject(req.params.id);

		res.status(200).json(tickets);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while fecthing project tickets' });
	}
});

// GET - fetch all tickets for particular user by username
router.get('/submitted_by/:username', restricted, async (req, res) => {
	try {
		const tickets = await Tickets.findUserTickets(req.params.username);

		res.status(200).json(tickets);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while fecthing user tickets' });
	}
});

// GET - fetch all replies by username
router.get('/replies/:username', restricted, async (req, res) => {
	try {
		const replies = await Tickets.findRepliesByUsername(req.params.username);

		replies.length
			? res.status(200).json(replies)
			: res.status(404).json({ message: 'No replies for this user' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while fetching user replies' });
	}
});

// PUT - edit ticket, only accessible to superusers, admins and author of the ticket
router.put('/:id', restricted, async (req, res) => {
	const { id } = req.params;

	try {
		const ticket = await Tickets.editTicket(id, req.body);

		res.status(200).json(ticket);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Edit ticket failed' });
	}
});

// POST - add ticket
router.post('/', restricted, async (req, res) => {
	try {
		const ticket = await Tickets.addTicket(req.body);

		res.status(200).json(ticket);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Add ticket failed' });
	}
});

// DELETE - remove ticket by ID
router.delete('/:id', restricted, async (req, res) => {
	try {
		const deleted = await Tickets.deleteTicket(req.params.id);

		deleted
			? res.status(200).json({ removed: deleted })
			: res.status(404).json({ errMessage: 'Could not find ticket with given ID' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Delete ticket failed' });
	}
});

module.exports = router;
