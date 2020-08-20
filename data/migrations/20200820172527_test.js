
exports.up = function(knex) {
  return knex.schema.createTable('test', table => {
    table.increments('id')
    table.string('message').notNullable
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('test')
};
