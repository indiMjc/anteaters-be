const db = require('../../data/dbConfig');

const findById = id => {
	try {
		return db('users')
			.where({ id })
			.first();
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in auth db function while fetching user by ID' };
	}
};

const add = async user => {
	try {
		const id = await db('users')
			.insert(user)
			.returning('id');

		return findById(id[0]).first();
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in auth db function while adding new user' };
	}
};

const findByUsername = username => {
	try {
		return db('users')
			.where(db.raw('LOWER(??)', ['users.username']), username)
			.first();
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in auth db function while fetching user by username' };
	}
};

const findByEmail = email => {
	try {
		return db('users')
			.where(db.raw('LOWER(??)', ['users.email']), email)
			.first();
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in auth db function while fetching user by email' };
	}
};

module.exports = { add, findByUsername, findById, findByEmail };
