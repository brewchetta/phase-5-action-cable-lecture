import React, { useState, useEffect } from 'react'
import ChatRoom from './ChatRoom'

function App() {

  const [user, setUser] = useState(null)
  const [chatOpen, setChatOpen] = useState(null)

  useEffect(() => {
    fetch('/me')
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        setUser(data)
      }
    })
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

  return (
    <div className="App">

      <p>{user?.name || "Logged Out"}</p>

      <button type="button" onClick={handleLogin}>Login</button>

      <button type="button" onClick={() => setChatOpen(prev => !prev)}>{chatOpen ? "Close Chat" : "Open Chat"}</button>

      {chatOpen ? <ChatRoom user={user} /> : null}

    </div>
  );
}

export default App;
