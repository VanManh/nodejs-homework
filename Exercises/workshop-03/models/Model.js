const ObjectId = require('mongodb').ObjectID;
const db = require("../libs/db");

class Model
{
	constructor(schema) {
		this.schema = schema;
		console.log("Model.constructor");
	}

	db() {
		return db;
	}

	ObjectId(id) {
		return ObjectId(id)
	}
}

module.exports = Model;