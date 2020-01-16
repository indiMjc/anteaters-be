const db = require('../../data/dbConfig');

const findProjectById = id => {
	return db('projects').where({ id });
};

module.exports = { findProjectById };
