const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authenticate = require('../api/auth/auth-middleware');
const authRouter = require('../api/auth/auth-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth', authRouter);

server.use('/', (__, res) => {
	res.send('Server up');
});

module.exports = server;
