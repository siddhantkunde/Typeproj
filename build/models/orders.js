"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require('objection');
class Orders extends Model {
    static get tableName() {
        return "orders";
    }
}
exports.default = Orders;
