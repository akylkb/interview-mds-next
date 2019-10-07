
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('name', 100)
      table.text('description')
      table.string('email')
      table.string('avatar')
      table.text('password_hash')
      table.string('provider', 30)
      table.string('facebook_id')
      table.string('google_id')
      table.string('vk_id')
      table.string('yandex_id')
      table.enum('group', ['admin', 'user']).defaultTo('user')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
