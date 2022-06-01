"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require('objection');
class Products extends Model {
    static get tableName() {
        return "products";
    }
}
exports.default = Products;
