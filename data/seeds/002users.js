exports.seed = function(knex) {
	return knex('users').then(function() {
		return knex('users').insert([
			{
				id: 1,
				email: 'mike@gmail.com',
				username: 'Mike',
				lowercase_username: 'mike',
				password: 'password',
				role: 'developer',
				isAdmin: true,
				superUser: true
			},
			{
				id: 2,
				email: 'bernard@gmail.com',
				username: 'Bernard',
				lowercase_username: 'bernard',
				password: 'password',
				role: 'developer',
				isAdmin: true,
				superUser: true
			},
			{
				id: 3,
				email: 'jackson@gmail.com',
				username: 'Jackson',
				lowercase_username: 'jackson',
				password: 'password',
				role: 'user',
				isAdmin: false,
				superUser: false
			},
			{
				id: 4,
				email: 'jen@gmail.com',
				username: 'Jen',
				lowercase_username: 'jen',
				password: 'password',
				role: 'developer',
				isAdmin: true,
				superUser: false
			},
			{
				id: 5,
				email: 'april@gmail.com',
				username: 'April',
				lowercase_username: 'april',
				password: 'password',
				role: 'user',
				isAdmin: false,
				superUser: false
			}
		]);
	});
};
