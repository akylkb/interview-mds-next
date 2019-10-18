
exports.up = function (knex) {
  return knex.schema
    .createTable('questions', table => {
      table.increments('id').primary()
      table.boolean('active').defaultTo(false)
      table.integer('user_id').unsigned().notNullable()
      table.string('title')
      table.text('description')
      table.text('answer')
      table.enum('level', ['junior', 'middle', 'senior']).defaultTo('junior')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())

      table.foreign('user_id').references('users.id')
    })
    .createTable('question_likes', table => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable()
      table.integer('question_id').unsigned().notNullable()

      table.foreign('user_id').references('users.id')
      table.foreign('question_id').references('questions.id').onDelete('CASCADE')
    })
    .createTable('question_comments', table => {
      table.increments('id').primary()
      table.integer('question_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.boolean('marked').defaultTo(false)
      table.text('content').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())

      table.foreign('user_id').references('users.id')
      table.foreign('question_id').references('questions.id').onDelete('CASCADE')
    })
    .createTable('question_comment_likes', table => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable()
      table.integer('question_comment_id').unsigned().notNullable()

      table.foreign('user_id').references('users.id')
      table.foreign('question_comment_id').references('question_comments.id').onDelete('CASCADE')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTable('questions')
    .dropTable('question_comments')
    .dropTable('question_comment_likes')
    .dropTable('question_likes')
}
