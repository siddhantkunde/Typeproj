import { RelationMappings } from "objection";
import User from "./customers";
const knex=require('../db/db-setup');
const {Model,RelationMappings} = require('objection')
Model.knex(knex);
export default class Product extends Model {
	static get tableName() {
		return "products";
	}
	static relationMappings:RelationMappings = {
		owner:{
		    relation: Model.BelongsToOneRelation,
		    modelClass: require('./customers').default,
		    join: {
			    from:'products.user_id',
			    to: 'users.id'
		    }
		}
	};
}