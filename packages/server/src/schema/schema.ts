import { makeExecutableSchema } from "@graphql-tools/schema"
import fs from "node:fs"
import { resolvers } from "./resolver"

const typeDefinitions = fs.readFileSync(__dirname + "/schema.graphql", "utf-8")

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
})
