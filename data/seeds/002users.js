exports.seed = function(knex) {
	return knex('users').then(function() {
		return knex('users').insert([
			{
				id: 1,
				email: 'indimjc@gmail.com',
				username: 'mike',
				password: 'password',
				role: 'admin'
			},
			{
				id: 2,
				email: 'bernard@gmail.com',
				username: 'bernard',
				password: 'password',
				role: 'developer'
			},
			{
				id: 3,
				email: 'jackson@gmail.com',
				username: 'jackson',
				password: 'password',
				role: 'project manager'
			},
			{
				id: 4,
				email: 'jen@gmail.com',
				username: 'jen',
				password: 'password',
				role: 'stakeholder'
			},
			{
				id: 5,
				email: 'april@gmail.com',
				username: 'april',
				password: 'password',
				role: 'user'
			}
		]);
	});
};
