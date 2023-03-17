import { renderGraphiQL } from "@graphql-yoga/render-graphiql"
import { createYoga } from "graphql-yoga"
import { createServer } from "node:http"
import { dbCtx } from "./db/fake-db"
import { GqlContext } from "./db/models"
import { schema } from "./schema/schema"

function main() {
  const context: GqlContext = { db: dbCtx }
  const yoga = createYoga({ schema, context, renderGraphiQL })
  const server = createServer(yoga)
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql")
  })
}

main()
