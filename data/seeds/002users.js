exports.seed = function(knex) {
	return knex('users').then(function() {
		return knex('users').insert([
			{
				id: 1,
				email: 'indimjc1@gmail.com',
				username: 'indimjc',
				password: 'password',
				role: 'admin',
				approved: true
			},
			{
				id: 2,
				email: 'bernard@gmail.com',
				username: 'bernard',
				password: 'password',
				role: 'developer',
				approved: false
			},
			{
				id: 3,
				email: 'jackson@gmail.com',
				username: 'jackson',
				password: 'password',
				role: 'project manager',
				approved: true
			},
			{
				id: 4,
				email: 'jen@gmail.com',
				username: 'jen',
				password: 'password',
				role: 'stakeholder',
				approved: true
			},
			{
				id: 5,
				email: 'april@gmail.com',
				username: 'april',
				password: 'password',
				role: 'user',
				approved: true
			}
		]);
	});
};
