const {Model} = require('objection')

export default class Customer extends Model {
	static get tableName() {
		return "users";
	}
}

