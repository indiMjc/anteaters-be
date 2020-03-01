const signToken = require('./signToken')
const validateToken = require('./validateToken')
const authenticate = require('./authMiddleware')
const validateUserType = require('./validateUserType')

module.exports = { signToken, validateToken, authenticate, validateUserType }
