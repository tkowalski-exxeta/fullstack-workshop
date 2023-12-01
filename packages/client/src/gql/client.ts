import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import generatedIntrospection from "./fragement";

export const client = new ApolloClient({
  link: createHttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache(generatedIntrospection),
});
