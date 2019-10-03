
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('name', 100)
      table.string('email')
      table.string('avatar')
      table.text('password_hash')
      table.text('auth_token').notNullable()
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
