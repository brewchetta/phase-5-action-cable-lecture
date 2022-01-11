import React, { useState, useEffect } from 'react'
import consumer from './consumer-service'

function ChatRoom({user}) {

  // subscribed channel
  const [channel, setChannel] = useState(null)
  // messages from server
  const [messages, setMessages] = useState([])
  // form input
  const [messageInput, setMessageInput] = useState('')

  // set chat channel when logged in (can also happen when chat component mounts)
  useEffect(() => {
    if (user && !channel) {

      fetch('/messages')
      .then(res => res.json())
      .then(messages => {
        setMessages(prev => [...messages, ...prev])
      })

      const chatChannel = consumer.subscriptions.create({ channel: "ChatChannel", room: "Red Room" }, {
        received(data) {
          addToMessages(data)
        }
      })
      setChannel(chatChannel)
    }
  }, [user])

  function addToMessages(data) {
    setMessages(prev => [...prev, data])
  }

  function handleMessageInputChange(e) {
    setMessageInput(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    channel.send({body: messageInput})
    setMessageInput('')
  }

  return (
    <div>

      <h3>My Chat Room:</h3>

      {messages.map(m => <p>{m.user?.name ? `${m.user?.name}: ` : null} {m.content}</p>)}

      <form onSubmit={handleSubmit}>

      <input type="text" value={messageInput} onChange={handleMessageInputChange} />

      </form>

    </div>
  )
}

export default ChatRoom
