exports.up = function (knex) {
	return knex.schema.createTable("cars", (tbl) => {
		// PK
		tbl.increments("id");

		// VIN number, required field
		tbl.string("vin").notNullable();

		// Make, required field
		tbl.string("make").notNullable();

		// Model, required field
		tbl.string("model").notNullable();

		// Mileage, required field
		tbl.integer("mileage").notNullable();

		// Transmission, non-required
		tbl.string("transmission");

		// Status of Title, non-required
		tbl.string("title");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists("cars");
};
