exports.seed = function(knex) {
	return knex('users').then(function() {
		return knex('users').insert([
			{
				id: 1,
				email: 'mike@gmail.com',
				username: 'Mike',
				password: 'password',
				role: 'developer',
				isAdmin: true,
				superUser: true,
				isLocked: false
			},
			{
				id: 2,
				email: 'bernard@gmail.com',
				username: 'Bernard',
				password: 'password',
				role: 'developer',
				isAdmin: true,
				superUser: true,
				isLocked: false
			},
			{
				id: 3,
				email: 'jackson@gmail.com',
				username: 'Jackson',
				password: 'password',
				role: 'user',
				isAdmin: false,
				superUser: false,
				isLocked: false
			},
			{
				id: 4,
				email: 'jen@gmail.com',
				username: 'Jen',
				password: 'password',
				role: 'developer',
				isAdmin: true,
				superUser: false,
				isLocked: false
			},
			{
				id: 5,
				email: 'april@gmail.com',
				username: 'April',
				password: 'password',
				role: 'user',
				isAdmin: false,
				superUser: false,
				isLocked: false
			}
		]);
	});
};
