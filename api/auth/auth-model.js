const db = require('../../data/dbConfig');

const findById = id => {
	return db('users')
		.where({ id })
		.first();
};

const add = async user => {
	try {
		const id = await db('users')
			.insert(user)
			.returning('id');

		return findById(id[0]).first();
	} catch (err) {
		console.log(err);
		return { errMessage: 'Error in db function while adding new user' };
	}
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

module.exports = { add, findByUsername, findById, findByEmail };
