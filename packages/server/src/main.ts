import { renderGraphiQL } from "@graphql-yoga/render-graphiql";
import * as dotenv from "dotenv";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { GqlContext, createContext } from "./create-context";
import { resolvers } from "./resolver";
import { typeDefinitions } from "./schema";

dotenv.config();

async function main() {
  const schema = createSchema<GqlContext>({
    typeDefs: typeDefinitions,
    resolvers,
  });˚
  const yoga = createYoga({
    schema,
    context: createContext,
    renderGraphiQL,
  });
  const server = createServer(yoga);
  server.listen(3000, () => {
    console.info("Server is running on http://localhost:3000/graphql");
  });
}

main();
