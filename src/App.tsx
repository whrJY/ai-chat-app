import { useState } from 'react'
import { ChatContainer } from './components/ChatContainer'
import { Header } from './components/Header'
import { ThemeProvider } from './contexts/ThemeContext'
import { ChatProvider } from './contexts/ChatContext'

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <ChatContainer />
          </main>
        </div>
      </ChatProvider>
    </ThemeProvider>
  )
}

export default App