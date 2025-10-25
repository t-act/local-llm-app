import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [isSending, setIsSending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPromptUsed, setIsPromptUsed] = useState(false)
 
  const sendMessage = async () => {
    if (!input.trim() || isSending) return
    try {
      setIsSending(true)
      setIsLoading(true)
      setIsPromptUsed(true)
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      })
      const data = await res.json()
      setMessages((m) => [...m, data.response])
      setInput('')
    } catch (err) {
      console.error(err)
    } finally {
      setIsSending(false)
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      void sendMessage()
    }
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Local LLm Chatbot</h1>
      </header>

      <main>
        {isLoading ? (
          <div className="loading-screen">
            <p>Thinking...</p>
          </div>
        ) : (
          <>
            <div className="form-container">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  void sendMessage()
                }}
                className="form-row"
              >
                {isPromptUsed ? (
                  <textarea
                    className="prompt-used"
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Let's ask! Submit your question Enter+Shift"
                  />
                ) : (
                  <textarea
                    className="prompt"
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Let's ask! Submit your question Enter+Shift"
                  />
                )}
              </form>
            </div>
            <div className="messages-container">
              {messages.map((message, index) => (
                <div key={index} className="message">
                  {message}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App