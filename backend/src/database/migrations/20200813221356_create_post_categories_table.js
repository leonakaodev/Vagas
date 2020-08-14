
exports.up = function(knex) {
  return knex.schema.createTable('post_categories', function (table) {
    table.integer('post_id')
    table.integer('category_id')
    table.primary(['post_id', 'category_id'])
    table.foreign('post_id').references('id').inTable('posts');
    table.foreign('category_id').references('id').inTable('categories');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('post_categories');
};
