import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:3001/api/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default apolloClient;
