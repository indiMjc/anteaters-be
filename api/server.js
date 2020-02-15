const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// const { authenticate, authRouter } = require('../api/auth');
const routes = require('./routes');

const logger = require('./logger');

const server = express();

server.use(express.json(), helmet(), cors(), logger, routes);

server.get('/', (__, res) => {
	res.status(200).json({ message: 'Server up' });
});

module.exports = server;
