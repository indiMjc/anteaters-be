exports.up = tbl => {
	return tbl.schema.createTable('projects', tbl => {
		tbl.increments();

		tbl.string('name', 128)
			.notNullable()
			.unique();

		tbl.text('description', 1000).notNullable();

		tbl.integer('stakeholder_id')
			.unsigned()
			.references('id')
			.inTable('users')
			.onDelete('SET NULL')
			.onUpdate('CASCADE');

		tbl.integer('project_manager_id')
			.unsigned()
			.references('id')
			.inTable('users')
			.onDelete('SET NULL')
			.onUpdate('CASCADE');
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('projects');
};
