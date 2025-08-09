import { Message } from '../types/chat'

// Simulate AI API call
export async function simulateAIResponse(
  userMessage: string,
  conversationHistory: Message[]
): Promise<string> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

  // Simple response logic for demonstration
  const responses = {
    greetings: [
      '很高兴见到你！有什么可以帮助你的吗？',
      '你好！我是你的AI助手，随时为你服务。',
      '欢迎！我可以回答问题、提供建议或与你聊天。',
    ],
    questions: [
      '这是一个很好的问题。让我为你详细解答...',
      '根据我的理解，我认为...',
      '这个问题很有趣，我来分析一下...',
    ],
    general: [
      '我理解你的观点。让我们进一步讨论这个话题。',
      '感谢你的分享。这确实是一个值得思考的问题。',
      '我很乐意帮助你。你还有其他问题吗？',
    ],
  }

  const lowerMessage = userMessage.toLowerCase()

  // Check for greetings
  if (
    lowerMessage.includes('你好') ||
    lowerMessage.includes('hello') ||
    lowerMessage.includes('hi') ||
    lowerMessage.includes('嗨')
  ) {
    return getRandomResponse(responses.greetings)
  }

  // Check for questions
  if (
    lowerMessage.includes('什么') ||
    lowerMessage.includes('怎么') ||
    lowerMessage.includes('为什么') ||
    lowerMessage.includes('如何') ||
    lowerMessage.includes('?') ||
    lowerMessage.includes('？')
  ) {
    return getRandomResponse(responses.questions)
  }

  // Default response
  return getRandomResponse(responses.general)
}

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)]
}

// Real AI API integration example (uncomment to use)
/*
export async function callOpenAI(
  messages: { role: string; content: string }[]
): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to get AI response')
  }

  const data = await response.json()
  return data.choices[0].message.content
}
*/