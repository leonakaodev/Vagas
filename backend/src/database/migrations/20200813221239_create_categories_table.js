
exports.up = function(knex) {
  return knex.schema.createTable('categories', function (table) {
    table.increments('id')
    table.string('name').notNullable()
    table.dateTime('created_at')
    table.dateTime('updated_at')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
