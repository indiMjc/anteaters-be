const db = require('../../data/dbConfig');

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
	const id = await db('users')
		.insert(user)
		.returning('id');

	return db('users')
		.where({ id: id[0] })
		.first();
};

const getSafeUserData = id => {
	return db
		.select('username', 'role')
		.from('users')
		.where({ id })
		.first();
};

const editUser = async (id, changes) => {
	await db('users')
		.where({ id })
		.update(changes);

	return getSafeUserData(id);
};

const editPermissions = async (id, newPermission) => {
	await db('users')
		.where({ id })
		.update(newPermission);

	return getSafeUserData(id);
};

module.exports = { add, findByUsername, findByEmail, editPermissions, editUser };
