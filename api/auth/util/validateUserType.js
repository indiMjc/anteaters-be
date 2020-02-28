const bcrypt = require('bcryptjs');

// prettier-ignore
module.exports = async (req, res, next) => {
    const { id } = req.params;
	const { uid, isAdmin, superUser } = req.locals;
	const userObj = req.body;

    // if user is not me and they are attempting to edit permissions, delete the permissions off the request
	if (uid != 1) {
		if (userObj.isAdmin) delete userObj.isAdmin;
		if (userObj.superUser) delete userObj.superUser;
	}
    
	// only i can edit my own account
	if (id == 1 && uid != 1) return res.status(400).json({ message: 'Sorry, you do not have permission to edit this user' });
    
    // if password, hash it
    if (userObj.password) userObj.password = bcrypt.hashSync(userObj.password, Number(process.env.SALT));
    
    req.userObj = userObj;
    
	// only account owner, admins and superusers can edit user accounts
	return req.params.id == uid || isAdmin || superUser
		? next()
		: res.status(400).json({ message: 'Sorry, you do not have permission to edit this user' });
};
