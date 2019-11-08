Rails.application.routes.draw do
  resources :matches do
    resources :messages, only: [:index, :create]
    patch 'join', on: :member
    patch 'play', on: :member
  end
  resources :users
  resources :game_configurations
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
