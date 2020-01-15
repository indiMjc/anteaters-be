const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/', (__, res) => {
	res.send('Server up');
});

module.exports = server;
