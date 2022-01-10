import React, { useState, useEffect } from 'react'
import consumer from './consumer-service'

function App() {

  // STATE //

  // current user
  const [user, setUser] = useState(null)
  // subscribed channel
  const [channel, setChannel] = useState(null)
  // messages from server
  const [messages, setMessages] = useState([])
  // form input
  const [messageInput, setMessageInput] = useState('')

  console.log(messages);

  // EFFECTS //

  // set users through sessions/cookies
  useEffect(() => {
    fetch('/me')
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        setUser(data)
      }
    })
  }, [])

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

  // cleanup effect to unsubscribe chat channel
  useEffect(() => {
    // return channel?.unsubscribe()
  }, [])

  function handleLogin() {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({user_id: 1})
    })
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        setUser(data)
      }
    })
  }

  function handleValidateToken() {
    fetch('/validate')
    .then(res => res.json())
    .then(data => console.log(data))
  }

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
    <div className="App">

      <p>{user?.name || "Logged Out"}</p>

      <button type="button" onClick={handleLogin}>Login</button>

      <button type="button" onClick={handleValidateToken}>Validate Login</button>

      <div>

        <form onSubmit={handleSubmit}>

          <input type="text" value={messageInput} onChange={handleMessageInputChange} />

        </form>

        <h3>Messages:</h3>

        {messages.map(m => <p>{m.user?.name ? `${m.user?.name}: ` : null} {m.content}</p>)}

      </div>
    </div>
  );
}

export default App;
