// src/graphql/queries.js
import { gql } from '@apollo/client';

// 1. 定义发送消息的 mutation
const SEND_MESSAGE = gql`
  mutation SendMessage($input: String!) {
    SendMessage(input: $input) {
      id
      content
      role
      timestamp
    }
  }
`;

// 2. 定义接收消息的 query
const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      content
      role
      timestamp
    }
  }
`;

export { SEND_MESSAGE, GET_MESSAGES };