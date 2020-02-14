const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authenticate = require('../api/auth/auth-middleware');

const authRouter = require('../api/auth/auth-router');
const { ticketsRouter, projectsRouter, repliesRouter } = require('../api/routes');
// const projectsRouter = require('../api/routes/projects-router');
// const repliesRouter = require('../api/routes/ticket-replies-router');

const logger = (req, __, next) => {
	const date = new Date(Date.now());
	console.log(`${req.method} to ${req.originalUrl} at ${date.toDateString()}, ${date.toTimeString()}`);
	next();
};

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json(), logger);

server.use('/auth', authRouter);
server.use('/tickets', authenticate, ticketsRouter);
server.use('/projects', authenticate, projectsRouter);
server.use('/replies', authenticate, repliesRouter);

server.use('/', (__, res) => {
	res.send('Server up');
});

module.exports = server;
