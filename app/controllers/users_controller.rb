class UsersController < ApplicationController
  def show
    user = User.find_by(id: cookies.encrypted[:user_id])
    if user
      render json: user
    else
      render json: {error: "No cookie found"}, status: :unauthorized
    end
  end
end
