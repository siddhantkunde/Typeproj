"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const { Model } = require('objection');
class Customer extends Model {
    static get tableName() {
        return 'users';
    }
}
exports.Customer = Customer;
module.exports = Customer;
