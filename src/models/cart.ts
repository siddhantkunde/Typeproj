const {Model} = require('objection')
import { RelationMappings } from "objection";
export default class Cart extends Model {
	static get tableName() {
		return "cart";
	}
	static relationMappings:RelationMappings = {
		// main:{
		//     relation: Model.BelongsToOneRelation,
		//     modelClass: require('./customers').default,
		//     join: {
		// 	    from:'cart.user_id',
		// 	    to: 'users.id'
		//     }
		// }

		prod:{
		    relation: Model.HasOneRelation,
		    modelClass: require('./products').default,
		    join: {
			    from: 'products.id',
			    to:'cart.prod_id'
		    }
		}
	}

	

}