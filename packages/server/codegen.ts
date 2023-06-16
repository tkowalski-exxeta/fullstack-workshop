import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.ts",
  documents: ["../client/src/**/*.graphql"],
  // ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/generated.types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        mappers: {
          Form: "./db/types#FormDB",
          Question: "./db/types#QuestionDB",
        },
      },
    },
    "../../schema.graphql": {
      plugins: ["schema-ast"],
    },
    "../client/src/gql/graphql-operations.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
  hooks: { afterOneFileWrite: ["prettier --write"] },
};

export default config;
