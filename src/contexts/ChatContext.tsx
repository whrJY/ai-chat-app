import React, { createContext, useContext, useReducer, useCallback } from 'react'
import { Message, ChatState, ChatContextType } from '../types/chat'
import { simulateAIResponse } from '../services/aiService'
import { generateId } from '../utils/helpers'

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; content: string; isTyping?: boolean } }

const initialState: ChatState = {
  messages: [
    {
      id: generateId(),
      content: '你好！我是你的AI助手。有什么可以帮助你的吗？',
      role: 'assistant',
      timestamp: new Date(),
    },
  ],
  isLoading: false,
  error: null,
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: [initialState.messages[0]], // Keep the greeting message
        error: null,
      }
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.id
            ? {
                ...msg,
                content: action.payload.content,
                isTyping: action.payload.isTyping,
              }
            : msg
        ),
      }
    default:
      return state
  }
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const sendMessage = useCallback(async (content: string) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null })
      dispatch({ type: 'SET_LOADING', payload: true })

      // Add user message
      const userMessage: Message = {
        id: generateId(),
        content,
        role: 'user',
        timestamp: new Date(),
      }
      dispatch({ type: 'ADD_MESSAGE', payload: userMessage })

      // Add typing indicator
      const typingMessage: Message = {
        id: generateId(),
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        isTyping: true,
      }
      dispatch({ type: 'ADD_MESSAGE', payload: typingMessage })

      // Get AI response
      const response = await simulateAIResponse(content, state.messages)

      // Update the typing message with actual response
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: {
          id: typingMessage.id,
          content: response,
          isTyping: false,
        },
      })
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : '发送消息时出现错误',
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [state.messages])

  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' })
  }, [])

  const retryLastMessage = useCallback(async () => {
    const lastUserMessage = [...state.messages]
      .reverse()
      .find(msg => msg.role === 'user')

    if (lastUserMessage) {
      await sendMessage(lastUserMessage.content)
    }
  }, [state.messages, sendMessage])

  const value: ChatContextType = {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearMessages,
    retryLastMessage,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}