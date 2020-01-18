exports.seed = function(knex) {
	return knex('project_devs').then(function() {
		return knex('project_devs').insert([
			{ id: 1, project_id: 2, dev_username: 'Jackson' },
			{ id: 2, project_id: 3, dev_username: 'Mike' },
			{ id: 3, project_id: 1, dev_username: 'Bernard' },
			{ id: 4, project_id: 1, dev_username: 'Jackson' },
			{ id: 5, project_id: 1, dev_username: 'Mike' },
			{ id: 6, project_id: 2, dev_username: 'Bernard' }
		]);
	});
};
