exports.seed = function(knex) {
	return knex('ticket replies').then(function() {
		return knex('ticket replies').insert([
			{
				id: 1,
				reply:
					'Working on implementing form validation now.  I have written a hook that can handle all the form state tracking, form submissions and error handling.  Currently working on refactor.',
				created_at: Date.now(),
				ticket_id: 1,
				submitted_by: 2
			},
			{
				id: 2,
				reply:
					'I have removed the console.log from both login and register components.  Changes have been pushed up to github with pull request opened, awaiting code review.',
				created_at: Date.now(),
				ticket_id: 2,
				submitted_by: 3
			},
			{
				id: 3,
				reply:
					'This is a great idea!  I am going to look into how to implement this.',
				created_at: Date.now(),
				ticket_id: 3,
				submitted_by: 1
			}
		]);
	});
};
