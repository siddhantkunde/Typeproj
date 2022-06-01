import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users',(table: Knex.TableBuilder)=>{
        table.increments();
        table.string("name").notNullable().unique();
        table.string("email").notNullable().unique();
        table.bigInteger("phone")
        table.string("password").notNullable();
        table.timestamps(true,true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("users");
}

