exports.up = tbl => {
	return tbl.schema.createTable('ticket_devs', tbl => {
		tbl.increments();

		tbl.integer('ticket_id')
			.unsigned()
			.references('id')
			.inTable('tickets')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.integer('dev_username')
			.references('username')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('ticket_devs');
};
