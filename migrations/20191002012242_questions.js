
exports.up = function(knex) {
  return knex.schema
    .createTable('questions', table => {
      table.increments('id').primary()
      table.boolean('active').defaultTo(false)
      table.integer('user_id').unsigned().references('users.id')
      table.string('title')
      table.text('description')
      table.text('answer')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('question_likes', table => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id')
      table.integer('question_id').unsigned().references('questions.id')
    })
    .createTable('question_comments', table => {
      table.increments('id').primary()
      table.integer('question_id').unsigned().references('questions.id')
      table.integer('user_id').unsigned().references('users.id')
      table.boolean('marked').defaultTo(false)
      table.text('content').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('question_comment_likes', table => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id')
      table.integer('question_comment_id').unsigned().references('question_comments.id')
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('questions')
    .dropTable('question_comments')
    .dropTable('question_comment_likes')
    .dropTable('question_likes')
};
