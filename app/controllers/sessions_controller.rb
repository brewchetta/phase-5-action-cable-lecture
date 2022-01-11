class SessionsController < ApplicationController
  def create
    user = User.first
    cookies.encrypted[:user_id] = user.id
    render json: user
  end

  def destroy
    cookies.delete :user_id
    head :no_content
  end
end
