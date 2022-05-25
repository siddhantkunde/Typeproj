import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {


    // Inserts seed entries
    await knex("users").insert([
        {
            name: "Ram" ,
            email:"ramK@gmail.com",
            phone:"9245387612",
            password:"123"
        },

        { 
            name: "sham" ,
            email:"shaM@gmail.com",
            phone:"90526444164",
            password:"12SM"
        },
        { 
            
            name: "Shreya" ,
            email:"Shry@gmail.com",
            phone:"8142387612",
            password:"Shy20"
        },

    ]);
};
