import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'ai';
  timestamp: Date;
}

interface ChatBoxProps {
  onSendMessage?: (message: Message) => Promise<Message>;
  placeholder?: string;
  className?: string;
}

const AIChatBox: React.FC<ChatBoxProps> = ({
  onSendMessage,
  placeholder = "输入你的消息...",
  className = ""
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是你的AI助手，有什么可以帮助你的吗？',
      role: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    try {
      let aiResponse: Message;

      if (onSendMessage) {
        aiResponse = await onSendMessage(userMessage);
        //"2025-08-13T04:06:59.000Z" 字符串转化为 date对象
        aiResponse.timestamp = new Date(aiResponse.timestamp);
      } else {
        // 模拟AI响应
        await new Promise(resolve => setTimeout(resolve, 1000));
        const responses = [
          '这是一个很好的问题！让我来帮你解答。',
          '我理解你的需求，这里有一些建议...',
          '根据你提供的信息，我认为最佳的解决方案是...',
          '这个话题很有趣！从我的角度来看...',
          '让我为你详细分析一下这个问题。'
        ];
        const message = responses[Math.floor(Math.random() * responses.length)];
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: message,
          role: 'ai',
          timestamp: new Date()
        };
      }
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '抱歉，我遇到了一些问题。请稍后再试。',
        role: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`flex flex-col h-96 max-w-md mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 flex items-center gap-2">
        <Bot className="w-5 h-5" />
        <h2 className="font-semibold">AI助手</h2>
        <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-600'
                }`}
            >
              {message.role === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>
            <div
              className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${message.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p
                className={`text-xs mt-1 ${message.role === 'user'
                    ? 'text-blue-100'
                    : 'text-gray-500'
                  }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white text-gray-800 rounded-lg rounded-bl-none shadow-sm px-3 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatBox;