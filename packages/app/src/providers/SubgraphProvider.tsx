import { ChainId } from "@zoolabs/sdk";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useActiveWeb3React } from "../hooks";

const SUBGRAPH_LOCALHOST = "http://127.0.0.1:8000/subgraphs/name/zoo-labs/zoo";
const SUBGRAPH_RINKEBY =
  "https://api.thegraph.com/subgraphs/name/zoo-labs/zoo-rinkeby";
const SUBGRAPH_MAINNET =
  "https://api.thegraph.com/subgraphs/name/zoo-labs/zoo-bsc";

const createClient = (uri) => {
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};

const clients = {
  [ChainId.HARDHAT]: createClient(SUBGRAPH_LOCALHOST),
  [ChainId.RINKEBY]: createClient(SUBGRAPH_RINKEBY),
  [ChainId.BSC]: createClient(SUBGRAPH_MAINNET),
};

const fallbackClient =
  process.env.NODE_ENV === "development"
    ? clients[ChainId.HARDHAT]
    : clients[ChainId.RINKEBY];

export const SubgraphProvider = ({ children }) => {
  const { chainId } = useActiveWeb3React();
  const client = clients[chainId] || fallbackClient;
  console.log("subgraph client is", client);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
