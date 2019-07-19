
exports.up = function(knex) {
    return knex.schema.createTable('project', function (table) {
        table.increments();
        table.string('name', 128).notNullable();
        table.string('description').notNullable();
        table.boolean('completed').defaultTo(false);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project');
};
