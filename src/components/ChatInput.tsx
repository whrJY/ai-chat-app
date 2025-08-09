import { useState, useRef, KeyboardEvent } from 'react'
import { Send, RotateCcw, Trash2 } from 'lucide-react'
import { useChat } from '../contexts/ChatContext'
import { Button } from './ui/Button'
import { cn } from '../utils/helpers'

export function ChatInput() {
  const [input, setInput] = useState('')
  const { sendMessage, isLoading, clearMessages, retryLastMessage, error } = useChat()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const message = input.trim()
    setInput('')
    await sendMessage(message)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleRetry = async () => {
    await retryLastMessage()
  }

  const handleClear = () => {
    clearMessages()
    setInput('')
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          清空对话
        </Button>
        
        {error && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            重试
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入您的消息... (Enter发送，Shift+Enter换行)"
            disabled={isLoading}
            rows={1}
            className={cn(
              'w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600',
              'rounded-xl resize-none bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400',
              'focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'min-h-[48px] max-h-32 overflow-y-auto'
            )}
            style={{
              height: 'auto',
              minHeight: '48px',
              maxHeight: '128px',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = Math.min(target.scrollHeight, 128) + 'px'
            }}
          />
        </div>
        
        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 py-3 h-12 rounded-xl"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}