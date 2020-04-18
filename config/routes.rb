Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  
  resources :users do
    resources :blogs
  end

  get :all_blogs, controller: "blogs"

  resources :blogs do
    resources :comments
  end

  get "/users2/:user_id/blogs", to: 'blogs#index_by_user'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
