
import AIChatBox from './ai-chat-box'
import { SEND_MESSAGE } from './graphql/queryies'
import client from './graphql/apolloClient'

function App() {


  return (
    <>
      <AIChatBox
        onSendMessage={async (message) => {
          if (!message.content) {
            return;
          }
          try {
            const { data } = await client.mutate({
              mutation: SEND_MESSAGE,
              variables: {
                input: {
                  content: message.content,
                  role: message.sender, // 或者根据你的需求设置角色
                  timestamp: message.timestamp
                }
              }
            });
            console.log('Message sent successfully:', data);
            return data;
          } catch (error) {
            console.error('Error sending message:', error);
          }
        }
        }
        placeholder="请输入问题..."
      />
    </>
  )
}

export default App