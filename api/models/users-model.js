const db = require('../../data/dbConfig');

module.exports = { add, findBy, findById };

const findById = id => {
    return db('users')
        .where({ id })
        .first()
}

const add = user => {
    const [id] = await db('users').insert(user);

	return findById(id).first();
}

const findBy = filter => {
    return db('users')
    .where(filter)
    .first();
}

// function findById(id) {
// 	return db('users')
// 		.where({ id })
// 		.first();
// }

// function findBy(filter) {
// 	return db('users')
// 		.where(filter)
// 		.first();
// }

// async function add(user) {
// 	const [id] = await db('users').insert(user);

// 	return findById(id).first();
// }
