exports.up = function(knex) {
  return knex.schema.createTable('posts', function (table) {
    table.increments('id')
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.string('image').nullable()
    table.dateTime('created_at')
    table.dateTime('updated_at').nullable()
    table.dateTime('deleted_at').nullable()
  });
};
    
exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
