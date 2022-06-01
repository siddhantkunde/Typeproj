const {Model} = require('objection')

export default class Products extends Model {
	static get tableName() {
		return "products";
	}

}