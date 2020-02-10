exports.seed = function(knex) {
	return knex('project_devs').then(function() {
		return knex('project_devs').insert([
			{ id: 1, project_id: 2, dev_id: 3 },
			{ id: 2, project_id: 3, dev_id: 1 },
			{ id: 3, project_id: 1, dev_id: 2 },
			{ id: 4, project_id: 1, dev_id: 3 },
			{ id: 5, project_id: 1, dev_id: 1 },
			{ id: 6, project_id: 2, dev_id: 2 }
		]);
	});
};
