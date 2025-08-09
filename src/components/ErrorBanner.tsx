import { AlertCircle, X } from 'lucide-react'
import { useChat } from '../contexts/ChatContext'
import { Button } from './ui/Button'

export function ErrorBanner() {
  const { error, retryLastMessage } = useChat()

  if (!error) return null

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700 dark:text-red-300 text-sm">
            {error}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={retryLastMessage}
            className="text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/30"
          >
            重试
          </Button>
        </div>
      </div>
    </div>
  )
}