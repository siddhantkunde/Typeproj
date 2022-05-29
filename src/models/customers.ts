const {Model} = require('objection')

export default class Customer extends Model {
	static get tableName() {
		return "users";
	}

	// static get jsonSchema() {
	// 	return {
	// 	  type: 'object',
	// 	  required: ['name', 'email', 'phone','password'],
	
	// 	  properties: {
	// 		id: { type: 'integer' },
	// 		name: { type: 'string', minLength: 1, maxLength: 255 },
	// 		email: { type: 'string', minLength: 1, maxLength: 255 },
	// 		phone: { type: 'number' },
	//         password: {type: 'string'},
	// 	  }
	// 	};
	//   }
}


