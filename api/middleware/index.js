const { validateEditProject, validateDeleteProject } = require('./validateProjectWriting');
const { validateNewUser, validateLogin } = require('./validateAuthData');
const { validateAdmin } = require('./validateAdmin');
const { validateAdminCreation } = require('./validateAdminCreation');

module.exports = {
	validateEditProject,
	validateDeleteProject,
	validateNewUser,
	validateLogin,
	validateAdmin,
	validateAdminCreation
};
