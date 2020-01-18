exports.seed = function(knex) {
	return knex('projects').then(function() {
		return knex('projects').insert([
			{
				id: 1,
				name: 'Bug Bully',
				lowercase_name: 'bug bully',
				description: 'Bug and issue tracking for software developers.',
				stakeholder: 'Jackson',
				project_manager: 'April'
			},
			{
				id: 2,
				name: 'DevShop24',
				lowercase_name: 'devshop24',
				description: 'A platform for freelance software developers.',
				stakeholder: 'Jackson',
				project_manager: null
			},
			{
				id: 3,
				name: 'Plant Purpose',
				lowercase_name: 'plant purpose',
				description: 'An app that helps users remember their schedule for plant care.',
				stakeholder: null,
				project_manager: 'April'
			}
		]);
	});
};
