import { RelationMappings } from "objection";
import Product from "./products";

const {Model,RelationMappings} = require('objection')

export default class User extends Model {
	static get tableName() {
		return "users";
	}
	// static relationMappings:RelationMappings = {
	// 	product:{
	// 		relation: Model.BelongsToOneRelation,
	// 		modelClass: require('./products').default,
	// 		join: {
	// 			from: 'product.user_id',
	// 			to: 'users.id'
	// 		}
	// 	}
	// };
}


