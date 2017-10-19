const Model = require("./Model");
const schema = { 
	"address" : {
		"street" : {type: "string", required: true},
		"zipcode" : {type: "string", required: true},
		"building" : {type: "string", required: true},
		"coord" : {type: "array", required: true}
	},
	"borough" : {type: "string", required: true},
	"cuisine" : {type: "string", required: true},
	"grades" : {type: "array", required: true},
	"name" : {type: "array", required: true}
};

class Restaurant extends Model
{
	constructor() {
		super(schema);
		this.collection = 'restaurants';
		console.log("Model.Restaurant.constructor");
	}

	list(callback) {
		this.db().find(this.collection, {}, function(err, docs) {
			callback(err, docs);
		})
	}

	info(id, callback) {
		var query = { _id: this.ObjectId(id) };
		
		this.db().find(this.collection, query, function(err, docs) {
			callback(err, docs);
		});
	}

	insert(data, callback) {
		this.db().insert(this.collection, data, function(err, data) {
			callback(err, data);
		})
	}

	delete(id, callback) {
		var query = { _id: this.ObjectId(id) };
		this.db().find_by_id(this.collection, query, function(err, docs) {
			callback(err, docs);
		});
	}
}

module.exports = new Restaurant();
