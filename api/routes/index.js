const router = require('express').Router();

const { authenticate, authRouter } = require('../../api/auth');

const projectsRouter = require('./projects-router');
const repliesRouter = require('./ticket-replies-router');
const ticketsRouter = require('./tickets-router');

router.use('/auth', authRouter);

router.use('/tickets', authenticate, ticketsRouter);
router.use('/projects', authenticate, projectsRouter);
router.use('/replies', authenticate, repliesRouter);

module.exports = router;
