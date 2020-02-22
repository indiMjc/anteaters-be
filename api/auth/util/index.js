const signToken = require('./signToken');
const validateToken = require('./validateToken');
const authenticate = require('./auth-middleware');
const validateUserType = require('./validateUserType');

module.exports = { signToken, validateToken, authenticate, validateUserType };
