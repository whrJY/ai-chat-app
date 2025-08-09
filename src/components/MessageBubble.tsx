import { Bot, User } from 'lucide-react'
import { Message } from '../types/chat'
import { formatTime, cn } from '../utils/helpers'
import { TypingIndicator } from './TypingIndicator'
import { Avatar } from './ui/Avatar'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isTyping = message.isTyping

  return (
    <div
      className={cn(
        'flex gap-3 message-animation',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className="flex-shrink-0">
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </Avatar>

      <div
        className={cn(
          'flex flex-col max-w-[80%]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'px-4 py-2 rounded-2xl text-sm leading-relaxed',
            isUser
              ? 'bg-blue-500 text-white rounded-br-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
          )}
        >
          {isTyping ? (
            <TypingIndicator />
          ) : (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          )}
        </div>
        
        <span
          className={cn(
            'text-xs text-gray-500 dark:text-gray-400 mt-1 px-1',
            isUser ? 'text-right' : 'text-left'
          )}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}