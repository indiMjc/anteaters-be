const { validateEdit, validateDelete } = require('./validateProjectWriting');
const { validateNewUser, validateLogin } = require('./validateAuthData');
const { validateAdmin } = require('./validateAdmin');
const { validateAdminCreation } = require('./validateAdminCreation');

module.exports = {
	validateEdit,
	validateDelete,
	validateNewUser,
	validateLogin,
	validateAdmin,
	validateAdminCreation
};
