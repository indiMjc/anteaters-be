exports.up = tbl => {
	return tbl.schema.createTable('users', tbl => {
		tbl.increments();

		tbl.string('email', 128)
			.notNullable()
			.unique();

		tbl.string('username', 128)
			.notNullable()
			.unique();
		tbl.string('password', 128).notNullable();

		tbl.string('role', 128).notNullable();

		tbl.boolean('approved')
			.notNullable()
			.defaultTo(false);
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('users');
};
