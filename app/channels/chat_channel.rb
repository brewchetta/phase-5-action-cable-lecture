class ChatChannel < ApplicationCable::Channel

  def subscribed
    stream_from "chat_#{params[:room]}"
    ActionCable.server.broadcast("chat_#{params[:room]}", {content: "#{current_user.name} has joined"})
  end

  def receive(data)
    new_message = current_user.messages.create(content: data['body'])
    ActionCable.server.broadcast("chat_#{params[:room]}", new_message)
  end

  def unsubscribed
    ActionCable.server.broadcast("chat_#{params[:room]}", {content: "#{current_user.name} left"})
  end

end
