"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .createTable('users', (table) => {
            table.increments();
            table.string("name").notNullable().unique();
            table.string("email").notNullable().unique();
            table.bigInteger("phone");
            table.string("password").notNullable();
            table.timestamps(true, true);
        })
            .createTable('products', (table) => {
            table.increments();
            table.integer('Uid').references('id').inTable('users');
            table.string("name").notNullable();
            table.string("category").notNullable();
            table.integer("price").notNullable();
            table.timestamps(true, true);
        });
        // .createTable('orders',(table: Knex.TableBuilder)=>{
        //     table.increments();
        //     table.bigInteger('user_id');
        //     table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
        //     table.string('order_name').notNullable().unique();
        //     table.string("status").notNullable().defaultTo("not-delivered");
        //     table.timestamps(true,true);
        // })
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            // .dropTableIfExists("orders")
            .dropTableIfExists("users")
            .dropTableIfExists("products");
    });
}
exports.down = down;
