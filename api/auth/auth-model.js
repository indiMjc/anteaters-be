const db = require('../../data/dbConfig');

const findById = id => {
	return db('users')
		.where({ id })
		.first();
};

const findByUsername = username => {
	return db('users')
		.where(db.raw('LOWER(??)', ['users.username']), username)
		.first();
};

const findByEmail = email => {
	return db('users')
		.where(db.raw('LOWER(??)', ['users.email']), email)
		.first();
};

const add = async user => {
	user.isAdmin = false;
	user.superUser = false;

	const id = await db('users')
		.insert(user)
		.returning('id');

	return findById(id[0]).first();
};

const editUser = async (id, changes) => {
	await db('users')
		.where({ id })
		.update(changes);

	const user = await findById(id);
	console.log(' : editUser -> user', user);
	// user.isAdmin = false;
	// user.superUser = false;

	return user;
};

const editPermissions = async (id, newPermission) => {
	await db('users')
		.where({ id })
		.update(newPermission);

	return findById(id);
};

module.exports = { add, findByUsername, findById, findByEmail, editPermissions, editUser };
