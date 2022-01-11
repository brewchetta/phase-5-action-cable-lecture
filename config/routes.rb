Rails.application.routes.draw do
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/login", to: "sessions#destroy"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
