"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require('objection');
class Cart extends Model {
    static get tableName() {
        return "cart";
    }
}
exports.default = Cart;
Cart.relationMappings = {
    // main:{
    //     relation: Model.BelongsToOneRelation,
    //     modelClass: require('./customers').default,
    //     join: {
    // 	    from:'cart.user_id',
    // 	    to: 'users.id'
    //     }
    // }
    prod: {
        relation: Model.HasOneRelation,
        modelClass: require('./products').default,
        join: {
            from: 'products.id',
            to: 'cart.prod_id'
        }
    }
};
