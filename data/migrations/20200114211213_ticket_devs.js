exports.up = tbl => {
	return tbl.schema.createTable('ticket_devs', tbl => {
		tbl.increments();

		tbl.integer('project_id')
			.unsigned()
			.references('id')
			.inTable('projects')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.integer('dev_id')
			.unsigned()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('ticket_devs');
};
