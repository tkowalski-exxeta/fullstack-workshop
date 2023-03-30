import { renderGraphiQL } from "@graphql-yoga/render-graphiql";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import * as path from "path";
import { DataStore } from "./db";
import { resolvers } from "./resolvers";

dotenv.config();

type GqlContext = {
  db: DataStore;
};

const createContext = async (): Promise<GqlContext> => {
  const db = new DataStore(process.env.MONGO_URL!);
  await db.connectAsync(process.env.MONGO_DATABASE!);
  return { db };
};

async function main() {
  const typeDefs = readFileSync(
    path.join(__dirname, "generated.schema.graphql"),
    "utf-8"
  );
  const schema = createSchema<GqlContext>({
    typeDefs,
    resolvers,
  });
  const context = await createContext();
  const yoga = createYoga({
    schema,
    renderGraphiQL,
    context,
  });
  const server = createServer(yoga);
  server.addListener("close", async () => {
    await context.db.closeAsync();
  });
  server.listen(3000, () => {
    console.info("Server is running on http://localhost:3000/graphql");
  });
}

main();
