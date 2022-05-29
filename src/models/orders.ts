const {Model} = require('objection')

export default class Orders extends Model {
	static get tableName() {
		return "orders";
	}

}