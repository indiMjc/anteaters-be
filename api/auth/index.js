const authenticate = require('./auth-middleware');
const authRouter = require('./auth-router');

module.exports = { authenticate, authRouter };
