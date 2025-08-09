import { useEffect, useRef } from 'react'
import { useChat } from '../contexts/ChatContext'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { ErrorBanner } from './ErrorBanner'
import { Card } from './ui/Card'
import { scrollToBottom } from '../utils/helpers'

export function ChatContainer() {
  const { messages, error } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom(scrollAreaRef.current)
  }, [messages])

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)]">
      <Card className="h-full flex flex-col shadow-xl">
        {error && <ErrorBanner />}
        
        <div 
          ref={scrollAreaRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          <MessageList messages={messages} />
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <ChatInput />
        </div>
      </Card>
    </div>
  )
}