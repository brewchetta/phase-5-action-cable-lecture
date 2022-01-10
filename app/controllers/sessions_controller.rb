class SessionsController < ApplicationController
  def create
    user = User.first
    cookies.encrypted[:user_id] = user.id
    render json: user
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  def validate
    render json: { user_id: cookies.encrypted[:user_id] }
  end
end
