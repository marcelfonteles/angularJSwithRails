Rails.application.routes.draw do
  get 'dashboard/events/index', to: 'dashboard#events_index'
  get 'dashboard/customers/index', to: 'dashboard#customers_index'

  root 'dashboard#events_index'


  namespace :api do
  	resources :events, only: [:index, :create, :destroy, :show]
    resources :customers, only: [:index, :destroy, :create]
  end
  
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
