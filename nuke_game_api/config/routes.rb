Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :grid_squares

  resources :players do
    resources :weapons
  end

  patch "/end", to: "grid_squares#end_game"

end
