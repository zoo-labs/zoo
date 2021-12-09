import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

export const getApolloClient = new ApolloClient({
  uri: 'http://127.0.0.1:8000/subgraphs/name/zoo-labs/zoo',
  cache: new InMemoryCache()
});
