export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1">
      <span className="text-gray-600 dark:text-gray-300 text-sm mr-2">
        正在输入
      </span>
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}