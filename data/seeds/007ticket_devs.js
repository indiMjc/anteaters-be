exports.seed = function(knex) {
	return knex('ticket_devs').then(function() {
		return knex('ticket_devs').insert([
			{ id: 1, ticket_id: 2, dev_id: 3 },
			{ id: 2, ticket_id: 3, dev_id: 1 },
			{ id: 3, ticket_id: 1, dev_id: 2 },
			{ id: 4, ticket_id: 1, dev_id: 3 },
			{ id: 5, ticket_id: 1, dev_id: 1 },
			{ id: 6, ticket_id: 2, dev_id: 2 }
		]);
	});
};
