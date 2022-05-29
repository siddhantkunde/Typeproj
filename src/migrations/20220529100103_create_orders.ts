import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('orders',(table: Knex.TableBuilder)=>{
        table.increments();
        table.bigInteger('user_id');
        table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
        table.string('order_name').notNullable().unique();
        table.string("status").notNullable().defaultTo("not-delivered");
        table.timestamps(true,true);
        table.timestamp('deleted_at').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("orders");
}

