
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
                input:  message.content
              }
            });
            return data.SendMessage;
          } catch (error) {``
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