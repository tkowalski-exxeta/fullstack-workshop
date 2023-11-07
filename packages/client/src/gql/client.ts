import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries"
import generatedIntrospection from "./fragement"

// import { usePregeneratedHashes } from "graphql-codegen-persisted-query-ids/lib/apollo"

// const hashes = require("../persisted-query-ids/client.json")
// const persistedLink = createPersistedQueryLink({
//   useGETForHashedQueries: true, // Optional but allows better caching
//   generateHash: usePregeneratedHashes(hashes),
// })

const persistedLink = createPersistedQueryLink({
  generateHash: (document: any) => document["__meta__"]["hash"],
})

export const client = new ApolloClient({
  link: persistedLink.concat(createHttpLink({ uri: "/graphql" })),
  cache: new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
  }),
})
