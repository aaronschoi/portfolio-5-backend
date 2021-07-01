exports.up = function (knex) {
    return knex.schema.createTable('hello', (table) => {
      table.increments('hello_id').primary();
      table.string('hello')
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('hello');
  };