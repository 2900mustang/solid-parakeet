# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

User.create(email: Faker::Internet.email, password:"passwood", username: Faker::Internet.username)
User.create(email: Faker::Internet.email, password:"passwood", username: Faker::Internet.username)

@current_user = User.find(1)

3.times do
  @blog = @current_user.blogs.build(title: Faker::Internet.slug, text: Faker::Lorem.paragraphs(number: 11, supplemental: true))
  @blog.save
end

@current_blog = Blog.find(2)
2.times do
  @comment = @current_blog.comments.build(commenter: @current_user.username, body: Faker::Lorem.question(word_count: 4, supplemental: false, random_words_to_add: 0), blog_id: @current_blog.id, user_id: @current_user.id)   
  @comment.save
end

@current_user = User.find(2)

4.times do
  @blog = @current_user.blogs.build(title: Faker::Internet.slug, text: Faker::Lorem.paragraphs(number: 7, supplemental: false))
  @blog.save
end

@current_blog = Blog.find(4)
2.times do
  @comment = @current_blog.comments.build(commenter: @current_user.username, body: Faker::Lorem.question(word_count: 4, supplemental: true, random_words_to_add: 0), blog_id: @current_blog.id, user_id: @current_user.id)   
  @comment.save
end

@current_blog = Blog.find(7)
2.times do
  @comment = @current_blog.comments.build(commenter: @current_user.username, body: Faker::Lorem.question(word_count: 9, supplemental: true, random_words_to_add: 2), blog_id: @current_blog.id, user_id: @current_user.id)   
  @comment.save
end