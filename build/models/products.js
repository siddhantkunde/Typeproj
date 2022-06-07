"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customers_1 = __importDefault(require("./customers"));
const { Model } = require('objection');
class Product extends Model {
    static get tableName() {
        return "products";
    }
}
exports.default = Product;
Product.relationMappings = {
    owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: customers_1.default,
        join: {
            from: 'products.users_id',
            to: 'users.id'
        }
    }
};
