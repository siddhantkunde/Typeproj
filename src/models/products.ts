import Customer from "./customers";

const {Model} = require('objection')

export default class Product extends Model {
	static get tableName() {
		return "products";
	}
	static relationMappings = {
		owner: {
		  relation: Model.BelongsToOneRelation,
		  modelClass: Customer,
		  join: {
			from: 'products.users_id',
			to: 'users.id'
		  }
		}
	};
}