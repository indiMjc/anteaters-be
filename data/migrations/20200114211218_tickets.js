const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

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

		tbl.timestamp('created_at', { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());

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
