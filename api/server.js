const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const logger = require('./logger');

const routes = require('./routes');

server.use(express.json(), helmet(), cors(), logger, routes);

server.get('/', (__, res) => {
	res.status(200).json({ message: 'Server up' });
});

module.exports = server;
