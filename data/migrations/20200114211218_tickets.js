exports.up = tbl => {
	return tbl.schema.createTable('tickets', tbl => {
		tbl.increments();

		tbl.string('title', 128).notNullable();

		tbl.string('category', 128).notNullable();

		tbl.text('description', 1000).notNullable();

		tbl.string('urgency', 128).notNullable();

		tbl.boolean('resolved')
			.notNullable()
			.defaultTo(false);

		tbl.boolean('in_progress')
			.notNullable()
			.defaultTo(false);

		tbl.timestamp('created_at', { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());

		tbl.integer('submitted_by')
			.unsigned()
			.references('id')
			.inTable('users')
			.onDelete('SET NULL')
			.onUpdate('CASCADE');

		tbl.integer('project_id')
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('projects')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('tickets');
};
