import { MessageCircle, Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Button } from './ui/Button'

export function Header() {
  const { theme, setTheme, actualTheme } = useTheme()

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  }

  const nextTheme = {
    light: 'dark' as const,
    dark: 'system' as const,
    system: 'light' as const,
  }

  const ThemeIcon = themeIcons[theme]

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI 聊天助手
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              智能对话体验
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(nextTheme[theme])}
          className="p-2"
          aria-label="切换主题"
        >
          <ThemeIcon className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}