
import AIChatBox from './ai-chat-box'


function App() {


  return (
    <>
      <AIChatBox 
        onSendMessage={async (message) => {
          // 这里调用你的AI API
          const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ message })
          });
          return response.text();
        }}
        placeholder="问我任何问题..."
      />
    </>
  )
}

export default App