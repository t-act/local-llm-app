import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const sendMessage = async () => {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    })
    const data = await res.json()
    setMessages((m) => [...m, "👤 " + input, "🤖 " + data.response])
    setInput('')
  }

  return (
    <div className='p-6 max-w-xl mx-auto'>
      <h1 className='text-xl font-bold mb-4'>Local LLM Chatbot</h1>
      <div className="border rounded p-2 h-80 overflow-y-auto bg-gray-50">
        {messages.map((m, i) => <div key={i}>{m}</div>)}
      </div>
      <div className="mt-4 flex">
        <input
          className="border flex-1 p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App
