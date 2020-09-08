exports.seed = function (knex) {
	return knex("cars").insert([
		{
			id: 1,
			vin: "123abc456def",
			make: "Toyota",
			model: "Highlander",
			mileage: 87324,
			transmission: "Automatic",
			title: null,
		},
		{
			id: 2,
			vin: "789ghi012jkl",
			make: "Toyota",
			model: "Corolla",
			mileage: 47366,
			transmission: "Automatic",
			title: null,
		},
	]);
};
