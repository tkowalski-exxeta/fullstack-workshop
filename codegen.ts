import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "./packages/server/src/schema.ts",
  documents: ["./packages/client/src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./packages/server/src/generated.types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./create-context#GqlContext",
        mappers: {
          Form: "./db/types#FormDB",
          Question: "./db/types#QuestionDB",
        },
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
    },
    "./packages/client/src/gql/": {
      preset: "client",
    },
  },
  hooks: { afterOneFileWrite: ["prettier --write"] },
}

export default config
