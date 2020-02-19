const { validateEdit, validateDelete } = require('./validateProjectWriting');
const { validateEditReply } = require('./validateReplyWriting');
const { validateNewUser, validateLogin } = require('./validateAuthData');
const { validateAdmin } = require('./validateAdmin');
const { validateAdminCreation } = require('./validateAdminCreation');

module.exports = {
	validateEdit,
	validateDelete,
	validateEditReply,
	validateNewUser,
	validateLogin,
	validateAdmin,
	validateAdminCreation
};
