class MessagesController < ApplicationController
  def index
    render json: Message.all, include: :user
  end
end
