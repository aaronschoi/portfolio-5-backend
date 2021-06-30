exports.up = function (knex) {
    return knex.schema.createTable('messages', (table) => {
      table.increments('message_id').primary();
      table.string('from');
      table.string('message');
      table.string('status');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('messages');
  };