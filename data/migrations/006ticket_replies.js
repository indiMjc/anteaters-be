// const knexfile = require('../../knexfile');
// const knex = require('knex')(knexfile.development);

exports.up = tbl => {
	return tbl.schema.createTable('ticket_replies', tbl => {
		tbl.increments();

		tbl.text('reply', 1000).notNullable();

		tbl.integer('created_at')
			.defaultTo(new Date(Date.now()))
			.notNullable();

		tbl.integer('ticket_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('tickets')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.integer('submitted_by')
			.unsigned()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('ticket_replies');
};
