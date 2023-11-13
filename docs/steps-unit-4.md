# Steps

- Setup NPM workspaces
- Install grapqhql codegen

```bash
  npm install @graphql-codegen/cli @graphql-codegen/client-preset @graphql-codegen/schema-ast @graphql-codegen/typed-document-node @graphql-codegen/typescript-operations @graphql-codegen/typescript-resolvers
```

- Install Tanstack Query and Graphql-Request

```bash
  npm install @tanstack/react-query graphql-request
```

- Setup 'codegen.ts'

```
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
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
  hooks: { afterOneFileWrite: ["prettier --write"] },
}

export default config
```

- Run codegen in 'dev-mode' and write queries

- Try to use fragement-masking

- Try to use apollo and persisted queries


https://the-guild.dev/blog/unleash-the-power-of-fragments-with-graphql-codegen
