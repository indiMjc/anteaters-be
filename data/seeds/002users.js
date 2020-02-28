exports.seed = function(knex) {
	return knex('users').then(function() {
		return knex('users').insert([
			{
				id: 1,
				email: 'mike@gmail.com',
				username: 'Mike',
				password: '$2a$06$4csG3CEijjy7toup7UuxrOvW/9TYhT8LVFtQontH31NTvAqK70MAa',
				role: 'developer',
				isAdmin: true,
				superUser: true,
				isLocked: false
			},
			{
				id: 2,
				email: 'bernard@gmail.com',
				username: 'Bernard',
				password: '$2a$06$4csG3CEijjy7toup7UuxrOvW/9TYhT8LVFtQontH31NTvAqK70MAa',
				role: 'developer',
				isAdmin: true,
				superUser: true,
				isLocked: false
			},
			{
				id: 3,
				email: 'jackson@gmail.com',
				username: 'Jackson',
				password: '$2a$06$4csG3CEijjy7toup7UuxrOvW/9TYhT8LVFtQontH31NTvAqK70MAa',
				role: 'user',
				isAdmin: true,
				superUser: false,
				isLocked: false
			},
			{
				id: 4,
				email: 'jen@gmail.com',
				username: 'Jen',
				password: '$2a$06$4csG3CEijjy7toup7UuxrOvW/9TYhT8LVFtQontH31NTvAqK70MAa',
				role: 'developer',
				isAdmin: false,
				superUser: false,
				isLocked: false
			},
			{
				id: 5,
				email: 'april@gmail.com',
				username: 'April',
				password: '$2a$06$4csG3CEijjy7toup7UuxrOvW/9TYhT8LVFtQontH31NTvAqK70MAa',
				role: 'user',
				isAdmin: false,
				superUser: false,
				isLocked: false
			}
		])
	})
}
