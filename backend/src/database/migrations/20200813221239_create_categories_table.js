
exports.up = function(knex) {
  return knex.schema.createTable('categories', function (table) {
    table.increments('id')
    table.string('name').notNullable()
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
