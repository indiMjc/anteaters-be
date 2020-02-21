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

const editUser = async (id, changes) => {
	await db('users')
		.where({ id })
		.update(changes);

	const updatedUser = await db
		.select('username', 'role')
		.from('users')
		.where({ id })
		.first();

	return updatedUser;
};

const findById = id => {
	return db('users')
		.where({ id })
		.first();
};

const add = async user => {
	const id = await db('users')
		.insert(user)
		.returning('id');

	return findById(id[0]).first();
};

const editPermissions = async (id, newPermission) => {
	await db('users')
		.where({ id })
		.update(newPermission);

	return findById(id);
};

module.exports = { add, findByUsername, findByEmail, editPermissions, editUser };
