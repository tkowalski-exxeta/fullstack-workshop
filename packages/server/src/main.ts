import { renderGraphiQL } from "@graphql-yoga/render-graphiql"
import * as dotenv from "dotenv"
import { createSchema, createYoga } from "graphql-yoga"
import { usePersistedOperations } from "@graphql-yoga/plugin-persisted-operations"
import { createServer } from "node:http"
import { GqlContext, createContext } from "./create-context"
import { resolvers } from "./resolver"
import { typeDefinitions } from "./schema"
import { parse } from "graphql"

dotenv.config()

const store = require(`./persisted-documents.json`)

for (const key in store) {
  store[key] = parse(store[key]) // parse the string back to AST
}

async function main() {
  const schema = createSchema<GqlContext>({
    typeDefs: typeDefinitions,
    resolvers,
  })
  const context = await createContext()
  const yoga = createYoga({
    schema,
    context,
    renderGraphiQL,
    plugins: [
      usePersistedOperations({
        getPersistedOperation(sha256Hash: string) {
          return store[sha256Hash]
        },
        skipDocumentValidation: true,
      }),
    ],
  })
  const server = createServer(yoga)
  server.listen(3000, () => {
    console.info("Server is running on http://localhost:3000/graphql")
  })
}

main()
