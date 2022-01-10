Rails.application.routes.draw do
  get "/messages", to: "messages#index"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/login", to: "sessions#destroy"

  get "/validate", to: "sessions#validate"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
