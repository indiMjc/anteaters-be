const db = require('../../data/dbConfig');

const findById = id => {
	return db('users')
		.where({ id })
		.first();
};

const add = async user => {
	const [id] = await db('users').insert(user);

	return findById(id).first();
};

const findBy = filter => {
	return db('users')
		.where(filter)
		.first();
};

module.exports = { add, findBy, findById };
