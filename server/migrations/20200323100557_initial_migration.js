exports.up = function(knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id');
            table.string('username').unique();
            table.string('email');
            table.string('password');
            table.string('first_name');
            table.string('last_name');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })

        .createTable('ingredients',(table) =>{
            table.increments('id');
            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id');
            table.string('ingredient');
            table.datetime('expiration_date').defaultTo(knex.fn.now());
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('ingredients');
};
