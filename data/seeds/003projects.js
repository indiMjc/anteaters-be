exports.seed = function(knex) {
	return knex('projects').then(function() {
		return knex('projects').insert([
			{
				id: 1,
				name: 'Bug Bully',
				description: 'Bug and issue tracking for software developers.',
				stakeholder_id: 4,
				project_manager_id: 3
			},
			{
				id: 2,
				name: 'DevShop24',
				description: 'A platform for freelance software developers.',
				stakeholder_id: 4,
				project_manager_id: 3
			},
			{
				id: 3,
				name: 'Plant Purpose',
				description:
					'An app that helps users remember their schedule for plant care.',
				stakeholder_id: null,
				project_manager_id: null
			}
		]);
	});
};
