import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import generatedIntrospection from "./fragement";

export const client = new ApolloClient({
  // link: createHttpLink({ uri: "/graphql" }),
  link: createHttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(generatedIntrospection),
});
