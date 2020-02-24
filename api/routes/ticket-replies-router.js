const router = require('express').Router()

const Replies = require('../models/ticket-replies-model')

const { validateEditReply } = require('../middleware')

// GET - fetches all replies submitted by user by uid on token
router.get('/my_replies/', async (req, res) => {
	try {
		const replies = await Replies.findAllUsersReplies(req.locals.uid)

		replies.length ? res.status(200).json(replies) : res.status(404).json({ message: 'No replies yet' })
	} catch (err) {
		console.log(err)
		res.status(500).json({ errMessage: 'Error while fetching replies' })
	}
})

// POST - add reply
router.post('/', async (req, res) => {
	const reply = req.body

	reply.submitted_by = req.locals.uid

	try {
		const reply = await Replies.addReply(req.body)

		res.status(200).json(reply)
	} catch (err) {
		console.log(err)
		res.status(500).json({ errMessage: 'Error while adding reply' })
	}
})

// DELETE - remove reply by ID
router.delete('/:id', validateEditReply, async (req, res) => {
	try {
		const deleted = await Replies.deleteReply(req.params.id)

		deleted
			? res.status(200).json({ removed: deleted })
			: res.status(401).json({ errMessage: 'Could not find reply with given ID' })
	} catch (err) {
		console.log(err)
		res.status(500).json({ errMessage: 'Delete reply failed' })
	}
})

// PUT - edit reply
router.put('/:id', validateEditReply, async (req, res) => {
	try {
		const edited = await Replies.editReply(req.params.id, req.body)

		edited
			? res.status(200).json(edited)
			: res.status(404).json({ message: 'Could not find reply with given ID' })
	} catch (err) {
		console.log(err)
		res.status(500).json({ errMessage: 'Error while editing ticket' })
	}
})

module.exports = router
