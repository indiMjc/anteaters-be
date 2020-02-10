exports.seed = function(knex) {
	return knex('tickets').then(function() {
		return knex('tickets').insert([
			{
				id: 1,
				title: 'Implement form validation to prevent future errors',
				category: 'bug',
				description:
					'Form validation needs to be implemented to ensure that users are not submitting null fields on non nullable columns.',
				urgency: 'medium',
				is_resolved: false,
				in_progress: true,
				created_at: Date.now(),
				submitted_by: 3,
				project_id: 1
			},
			{
				id: 2,
				title: 'Major security threat',
				category: 'bug',
				description:
					'A console.log accidentally got left in during development and is recording user passwords on login.  Needs immediate fix for security.',
				urgency: 'high',
				is_resolved: true,
				in_progress: false,
				created_at: Date.now(),
				submitted_by: 1,
				project_id: 2
			},
			{
				id: 3,
				title: 'New feature idea',
				category: 'new feature suggestion',
				description:
					'Add ability for users to view all plants that we track that are growable in their growth zone.',
				urgency: 'low',
				is_resolved: false,
				in_progress: true,
				created_at: Date.now(),
				submitted_by: 5,
				project_id: 3
			},
			{
				id: 4,
				title: 'Memoize functional components',
				category: 'Refactor',
				description:
					'Due to the number of forms on the dashboard, too many components are rerendering during form input.  We should optimize that with memoization',
				urgency: 'low',
				is_resolved: true,
				in_progress: false,
				created_at: Date.now(),
				submitted_by: 1,
				project_id: 3
			}
		]);
	});
};
