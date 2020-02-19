const { validateEditTicket } = require('./validateTicketWriting');
const { validateEditProject } = require('./validateProjectWriting');
const { validateEditReply } = require('./validateReplyWriting');
const { validateNewUser, validateLogin } = require('./validateAuthData');
const { validateAdmin } = require('./validateAdmin');
const { validateAdminCreation } = require('./validateAdminCreation');

module.exports = {
	validateEditTicket,
	validateEditProject,
	validateEditReply,
	validateNewUser,
	validateLogin,
	validateAdmin,
	validateAdminCreation
};
