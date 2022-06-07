"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model, RelationMappings } = require('objection');
class User extends Model {
    static get tableName() {
        return "users";
    }
}
exports.default = User;
