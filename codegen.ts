import type { CodegenConfig } from "@graphql-codegen/cli"
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset"

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
      presetConfig: {
        fragmentMasking: true,
        persistedDocuments: true,
      },
      documentTransforms: [addTypenameSelectionDocumentTransform],
    },
    "./packages/client/src/gql/fragement.ts": {
      plugins: ["fragment-matcher"],
      config: {
        module: "es2015",
      },
    },
  },
  hooks: { afterOneFileWrite: ["prettier --write"] },
}

export default config
