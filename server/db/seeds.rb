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
  @blog = @current_user.blogs.build(title: Faker::Internet.slug, text: Faker::Lorem.paragraphs)
  @blog.save
end

@current_blog = Blog.find(2)
2.times do
  @comment = @current_blog.comments.build(commenter: @current_user.username, body: Faker::Lorem.paragraphs, blog_id: @current_blog.id, user_id: @current_user.id)
  # @comment = Comment.create(commenter: @blog.title, body: Faker::Lorem.paragraphs, blog_id: @current_blog.id)   
  @comment.save
end