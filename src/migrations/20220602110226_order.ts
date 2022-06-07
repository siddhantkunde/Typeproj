import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('orders',(table: Knex.TableBuilder)=>{
        table.increments();
        table.integer('user_id');
        table.foreign('user_id').references('id').inTable('users').index().onDelete('cascade');
        table.string("name").notNullable()
        table.string("status").notNullable()
        table.integer("bill").notNullable()
        table.timestamps(true,true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists("orders")
}

