const {Model} = require('objection')

export class Customer extends Model {
	static get tableName() {
		return 'users';
	}
}
module.exports = Customer
