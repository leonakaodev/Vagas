
exports.up = function(knex) {
  return knex.schema.createTable('categories', function (table) {
    table.increments('id')
    table.string('name').notNullable()
    table.timestamps()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
