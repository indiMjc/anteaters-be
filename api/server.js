const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.arguments(helmet());
server.arguments(cors());
server.arguments(express.json());

module.exports = server;
