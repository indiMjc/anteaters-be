exports.up = tbl => {
	return tbl.schema.createTable('project_devs', tbl => {
		tbl.increments();

		tbl.integer('project_id')
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('projects')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.integer('dev_id')
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('project_devs');
};
