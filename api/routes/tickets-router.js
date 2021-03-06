const router = require('express').Router();

const Tickets = require('../models/tickets-model');

const { validateEditTicket } = require('../middleware');

// GET - fetch ticket with replies and devs arrays
router.get('/:id', async (req, res) => {
	try {
		const ticket = await Tickets.findTicket(req.params.id);
		ticket ? res.status(200).json(ticket) : res.status(404).json({ message: 'No ticket found by that ID' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while fetching ticket' });
	}
});

// GET - fetch all tickets for specific project
router.get('/by_project/:id', async (req, res) => {
	try {
		const tickets = await Tickets.findByProject(req.params.id);

		tickets.length
			? res.status(200).json(tickets)
			: res.status(400).json({ message: 'No tickets for this project yet' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while fecthing project tickets' });
	}
});

// GET - fetch all tickets for particular user by username
router.get('/submitted_by/:username', async (req, res) => {
	try {
		const tickets = await Tickets.findUserTickets(req.params.username);

		tickets.length
			? res.status(200).json(tickets)
			: res.status(404).json({ message: 'No tickets for this user yet' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while fecthing user tickets' });
	}
});

// GET - fetch all replies by username
router.get('/replies/:username', async (req, res) => {
	try {
		const replies = await Tickets.findRepliesByUsername(req.params.username);

		replies.length
			? res.status(200).json(replies)
			: res.status(404).json({ message: 'No replies for this user yet' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Error while fetching user replies' });
	}
});

// POST - add ticket
router.post('/', async (req, res) => {
	try {
		const ticket = await Tickets.addTicket(req.body);

		res.status(200).json(ticket);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Add ticket failed' });
	}
});

// PUT - edit ticket
router.put('/:id', validateEditTicket, async (req, res) => {
	const { id } = req.params;

	try {
		const ticket = await Tickets.editTicket(id, req.body);

		ticket
			? res.status(200).json(ticket)
			: res.status(404).json({ message: 'Could not find ticket with given ID' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Edit ticket failed' });
	}
});

// DELETE - remove ticket by ID
router.delete('/:id', validateEditTicket, async (req, res) => {
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

// POST - join ticket
router.post('/join/:id', async (req, res) => {
	try {
		const joined = await Tickets.joinTicket(req.params.id, req.locals.uid);

		joined
			? res.status(200).json(joined)
			: res.status(404).json({ errMessage: 'Could not find ticket with given ID' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMessage: 'Join ticket failed' });
	}
});

module.exports = router;
