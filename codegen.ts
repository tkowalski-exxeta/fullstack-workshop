import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: ["./packages/client/src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./packages/server/src/generated.types.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"],
      config: {
        mappers: {
          Form: "FormDbObject",
          Question: "QuestionDbInterface",
        },
      },
    },
    "./packages/server/src/generated.schema.graphql": {
      plugins: ["schema-ast"],
    },
    "./packages/client/src/gql/": {
      preset: "client",
    },
  },
  hooks: { afterOneFileWrite: ["prettier --write"] },
};

export default config;
