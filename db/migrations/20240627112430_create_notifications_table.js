const up = function(knex) {
    return knex.schema.createTable('notifications', table => {
      table.increments('id').primary();
      table.string('type');
      table.string('message');
      table.integer('user_id').references('id').inTable('users');
      table.boolean('sent').defaultTo(false);
    });
  };
  
 const down = function(knex) {
    return knex.schema.dropTable('notifications');
  };
  export { up, down };
  