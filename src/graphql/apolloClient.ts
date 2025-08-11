import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// 创建错误处理链接
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => 
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});
// 创建 HTTP 链接，指向你的 GraphQL API
const httpLink = new HttpLink({
  uri: "https://rongweb.win/api/", 
  fetchOptions: {
    mode: 'cors',
  }
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
        errorPolicy: 'all', // 返回部分数据和错误
        fetchPolicy: "cache-and-network",//
    },
    query: {
      fetchPolicy: "network-only",
    },
  }
});

export default client;