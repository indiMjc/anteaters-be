exports.up = tbl => {
	return tbl.schema.createTable('projects', tbl => {
		tbl.increments();

		tbl.string('name', 128)
			.notNullable()
			.unique();

		tbl.text('description', 1000).notNullable();

		tbl.integer('stakeholder')
			.references('users.username')
			// .inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.integer('project_manager')
			.references('users.username')
			// .inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('projects');
};
