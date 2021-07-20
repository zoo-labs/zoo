import { GraphQLClient } from "graphql-request"; // GraphQL request client

// Create client
const client = new GraphQLClient(
  // Zoo Rinkeby subgraph
  "https://api.thegraph.com/subgraphs/name/ourzoo/zoo-v1-rinkeby"
);

// Export client
export default client;
