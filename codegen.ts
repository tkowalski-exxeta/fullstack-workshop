import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "./packages/server/src/schema.ts",
  documents: ["./packages/client/src/**/*.graphql"],
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
    "./packages/client/src/gql/graphql-operations.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
  hooks: { afterOneFileWrite: ["prettier --write"] },
}

export default config
