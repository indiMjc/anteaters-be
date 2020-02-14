const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const { authenticate, authRouter } = require('../api/auth');
const { ticketsRouter, projectsRouter, repliesRouter } = require('../api/routes');

const logger = require('./logger');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json(), logger);

server.use('/auth', authRouter);
server.use(['/tickets', '/projects', '/replies'], authenticate);
server.use('/tickets', ticketsRouter);
server.use('/projects', projectsRouter);
server.use('/replies', repliesRouter);

server.use('/', (__, res) => {
	res.send('Server up');
});

module.exports = server;
