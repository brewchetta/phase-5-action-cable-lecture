import React, { useState } from 'react'

function ChatRoom({user}) {

  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')

  function handleMessageInputChange(e) {
    setMessageInput(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log("---Something happens here---");
    setMessageInput('')
  }

  return (
    <div>

      <h3>Cat Chat Room:</h3>

      {/* messages get mapped here */}

      <form onSubmit={handleSubmit}>

      <input type="text" value={messageInput} onChange={handleMessageInputChange} />

      </form>

    </div>
  )
}

export default ChatRoom
