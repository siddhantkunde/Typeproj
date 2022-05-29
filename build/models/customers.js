"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require('objection');
class Customer extends Model {
    static get tableName() {
        return "users";
    }
}
exports.default = Customer;
