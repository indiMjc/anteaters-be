exports.up = tbl => {
	return tbl.schema.createTable('tickets', tbl => {
		tbl.increments();

		tbl.string('title', 128).notNullable();

		tbl.string('category', 128).notNullable();

		tbl.text('description', 1000).notNullable();

		tbl.string('urgency', 6).notNullable();

		tbl.boolean('is_resolved')
			.notNullable()
			.defaultTo(0);

		tbl.boolean('in_progress')
			.notNullable()
			.defaultTo(0);

		tbl.string('created_at')
			.defaultTo(new Date(Date.now()))
			.notNullable();

		tbl.integer('submitted_by')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.integer('project_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('projects')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('tickets');
};
