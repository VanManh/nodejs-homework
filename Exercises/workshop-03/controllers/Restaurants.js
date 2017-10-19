const Controller = require("./Controller");
const Restaurant = require("../models/Restaurant");

class Restaurants extends Controller
{
	constructor() {
		super();
	}

	list(req, res, next) {
		Restaurant.list(function(err, docs) {
			res.json(docs)
		});
		
	}

	add(req, res, next) {
		var data = {
			"address" : {
				"street" : "2 Avenue",
				"zipcode" : "10075",
				"building" : "1480",
				"coord" : [ -73.9557413, 40.7720266 ]
			},
			"borough" : "Manhattan",
			"cuisine" : "Italian",
			"grades" : [
				{
					"date" : new Date("2014-10-01T00:00:00Z"),
					"grade" : "A",
					"score" : 11
				},
				{
					"date" : new Date("2014-01-16T00:00:00Z"),
					"grade" : "B",
					"score" : 17
				}
			],
			"name" : "Vella",
			"restaurant_id" : "41704620"
		};
		Restaurant.insert(data, function(err, data) {
			res.json(data)
		})
	}

	info(req, res, next) {
		var id = req.params.id;
		console.log(id);

		Restaurant.info(id, function(err, data) {
			res.json(data)
		})
	}

	edit(req, res, next) {
		var id = req.params.id;
		console.log(id);

		Restaurant.info(id, function(err, data) {
			res.json(data)
		})
	}

	remove(req, res, next) {
		var id = req.params.id;
		console.log(id);

		Restaurant.delete(id, function(err, data) {
			res.json(data)
		})
	}
}

module.exports = new Restaurants();