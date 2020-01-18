exports.seed = function(knex) {
	return knex('ticket_devs').then(function() {
		return knex('ticket_devs').insert([
			{ id: 1, ticket_id: 2, dev_username: 'Bernard' },
			{ id: 2, ticket_id: 3, dev_username: 'Mike' },
			{ id: 3, ticket_id: 1, dev_username: 'Jen' },
			{ id: 4, ticket_id: 1, dev_username: 'Jackson' },
			{ id: 5, ticket_id: 1, dev_username: 'April' },
			{ id: 6, ticket_id: 2, dev_username: 'Mike' }
		]);
	});
};
