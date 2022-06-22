"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require('../db/db-setup');
const { Model, RelationMappings } = require('objection');
Model.knex(knex);
class Product extends Model {
    static get tableName() {
        return "products";
    }
}
exports.default = Product;
Product.relationMappings = {
    owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./customers').default,
        join: {
            from: 'products.user_id',
            to: 'users.id'
        }
    }
};
