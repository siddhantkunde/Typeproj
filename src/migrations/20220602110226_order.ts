import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cart',(table: Knex.TableBuilder)=>{
        table.increments();
        table.integer('user_id').references('id').inTable('users').index().onDelete('cascade');
        table.integer('prod_id').references('id').inTable('products').index().onDelete('cascade');
        table.string("status").notNullable().defaultTo("processing");
        table.integer("quantity").notNullable().defaultTo("1");
        table.integer("bill").notNullable()
        table.timestamps(true,true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists("cart")
}

