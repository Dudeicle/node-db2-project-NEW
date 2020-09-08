const express = require("express");
const knex = require("knex");

const db = knex({
	client: "sqlite3",
	connection: {
		filename: "./data/car-dealer.db3",
	},
	useNullAsDefault: true,
});

const router = express.Router();

router.get("/", (req, res) => {
	db("cars")
		.then((cars) => {
			res.json(cars);
		})
		.catch((err) => {
			res.status(500).json({ message: "Failed to retrieve cars" });
		});
}); // WORKING

router.get("/:id", (req, res) => {
	const { id } = req.params;

	db("cars")
		.where({ id })
		.first()
		.then((car) => {
			res.json(car);
		})
		.catch((err) => {
			res.status(500).json({ message: "Failed to retrieve car" });
		});
}); // WORKING

router.post("/", (req, res) => {
	const carsData = req.body;
	db("cars")
		.insert(carsData)
		.returning("id")
		.then((ids) => {
			res.status(201).json({ inserted: ids });
		})
		.catch((err) => {
			console.log("POST error", err);
			res.status(500).json({ message: "Failed to store data in Cars database" });
		});
}); // WORKING

router.put("/:id", (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	db("cars")
		.where("id", "=", id)
		.update(changes)
		.then((count) => {
			if (count) {
				res.status(201).json(count);
			} else {
				res.status(404).json({ message: "could not find the id of the car specified" });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "error changing code" });
		});
}); // WORKING

router.delete("/:id", (req, res) => {
	const { id } = req.params;

	db("cars")
		.where("id", "=", id)
		.del()
		.then((car) => {
			res.json(car);
		})
		.catch((err) => {
			res.status(500).json({ message: "Failed to retrieve car" });
		});
}); // WORKING

module.exports = router;
