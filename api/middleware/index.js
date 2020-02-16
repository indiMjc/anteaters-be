const { validateEditProject, validateDeleteProject } = require('./validateProjectWriting');
const { validateNewUser, validateLogin } = require('./validateAuthData');
const { validateAdmin } = require('./validateAdmin');

module.exports = {
	validateEditProject,
	validateDeleteProject,
	validateNewUser,
	validateLogin,
	validateAdmin
};
