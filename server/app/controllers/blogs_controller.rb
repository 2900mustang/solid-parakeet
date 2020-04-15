class BlogsController < ApplicationController
  before_action :set_blog, only: [:show, :update, :destroy]
  before_action :authorize_request, except: [:all_blogs, :index, :show, :index_by_user]

  # GET /blogs
  def all_blogs
    @blogs = Blog.all

    render json: @blogs, include: [:user, :comments], status: :ok
  end
  
  def index
    @blogs = @current_user.blogs

    render json: @blogs, include: [:user, :comments], status: :ok
  end

  def index_by_user
    @user = User.find(params[:user_id])
    @blogs = @user.blogs

    render json: @blogs, include: :user, status: :ok
  end

  # GET /blogs/1
  def show
    render json: @blog, include: [:user, :comments], status: :ok
  end

  # POST /blogs
  def create
    @blog = @current_user.blogs.build(blog_params)

    if @blog.save
      render json: @blog, include: [:user, :comments], status: :created, location: @blog
    else
      render json: @blog.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /blogs/1
  def update
    if @blog.update(blog_params)
      render json: @blog, include: [:user, :comments], status: :ok
    else
      render json: @blog.errors, status: :unprocessable_entity
    end
  end

  # DELETE /blogs/1
  def destroy
    @blog.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_blog
      @blog = Blog.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def blog_params
      params.require(:blog).permit(:title, :text)
    end
end
