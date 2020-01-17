const db = require('../../data/dbConfig');

const findProjectById = id => {
	return db('projects').where({ id });
};

const findProjectBy = filter => {
	return db('projects')
		.where(filter)
		.first();
};

module.exports = { findProjectById, findProjectBy };
