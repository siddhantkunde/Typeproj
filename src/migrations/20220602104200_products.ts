import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products',(table: Knex.TableBuilder)=>{
        table.increments()
        table.string("name").notNullable()
        table.string("category").notNullable()
        table.integer("price").notNullable()
        table.timestamps(true,true);
    })

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists("products")
}

        // table.foreign('user_id').references('id').inTable('users').onDelete('cascade');