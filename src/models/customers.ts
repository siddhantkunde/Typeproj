import { RelationMappings } from "objection";
import Product from "./products";

const {Model,RelationMappings} = require('objection')

export default class User extends Model {
	static get tableName() {
		return "users";
	}
	// static relationMappings:RelationMappings = {
	// 	prod:{
	// 		relation: Model.HasManyRelation,
	// 		modelClass: require('./products').default,
	// 		join: {
	// 			from:'users.id',
	// 			to:'product.user_id'
	// 		}
	// 	}
	// };
}


