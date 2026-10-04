import { useEffect, useState } from 'react'
import './App.css'
import { io } from "socket.io-client"


function App() {
  const [socket, setSocket] = useState(null)
  const [conversation, setConversation] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (inputValue.trim() === '') return

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    setConversation(prev => [...prev, userMessage])
    setInputValue('')

    socket.emit('ai-prompt',inputValue)
  }

  useEffect(() => {
    let socketInstance = io('http://localhost:3000')
    setSocket(socketInstance)

    socketInstance.on('ai-response', (res) => {
      const botMessage = {
        id: Date.now() + 1,
        text: res,
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
      setConversation(prev => [...prev, botMessage])
    })
  }, [])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="app">
      <div className="messages-container">
        {conversation.length === 0 ? (
          <div className="empty-state">
            <p>Start a new conversation</p>
            <span>Type your message below and press Enter</span>
          </div>
        ) : (
          conversation.map(message => (
            <div
              key={message.id}
              className={`message ${message.sender}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
              </div>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="input-floating">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={inputValue.trim() === ''}
          className="send-button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default App
