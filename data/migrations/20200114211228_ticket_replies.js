exports.up = tbl => {
	return tbl.schema.createTable('ticket_replies', tbl => {
		tbl.increments();

		tbl.text('reply', 1000).notNullable();

		tbl.timestamp('created_at', { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());

		tbl.integer('ticket_id')
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('tickets')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.integer('submitted_by')
			.unsigned()
			.references('id')
			.inTable('users')
			.onDelete('SET NULL')
			.onUpdate('CASCADE');
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('ticket_replies');
};
