const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authenticate = require('../api/auth/auth-middleware');
const authRouter = require('../api/auth/auth-router');
const ticketsRouter = require('../api/routes/tickets-router');
const projectsRouter = require('../api/routes/projects-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth', authRouter);
server.use('/tickets', authenticate, ticketsRouter);
server.use('/projects', authenticate, projectsRouter);

server.use('/', (__, res) => {
	res.send('Server up');
});

module.exports = server;
