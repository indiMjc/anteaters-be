exports.up = tbl => {
	return tbl.schema
		.createTable('users', tbl => {
			tbl.increments();
			tbl.string('email', 128)
				.notNullable()
				.unique();
			tbl.string('username', 128)
				.notNullable()
				.unique();
			tbl.string('password', 128).notNullable();
			tbl.string('role', 128).notNullable();
		})

		.createTable('projects', tbl => {
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
		})

		.createTable('project_devs', tbl => {
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
		})

		.createTable('ticket_devs', tbl => {
			tbl.increments();
			tbl.integer('project_id')
				.unsigned()
				.references('id')
				.inTable('projects')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		})

		.createTable('tickets', tbl => {
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
			tbl.timestamp('created_at')
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
		})

		.createTable('ticket_replies', tbl => {
			tbl.increments();
			tbl.text('reply', 1000).notNullable();
			tbl.timestamp('submitted_at')
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
				.onUpdate('SET NULL');
		});
};

exports.down = tbl => {
	return tbl.schema
		.dropTableIfExists('ticket_replies')
		.dropTableIfExists('tickets')
		.dropTableIfExists('ticket_devs')
		.dropTableIfExists('project_devs')
		.dropTableIfExists('projects')
		.dropTableIfExists('users');
};
