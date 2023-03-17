import { preset } from "@eddeee888/gcg-typescript-resolver-files"
import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "packages/server/src/**/schema.graphql",
  documents: ["./packages/client/src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./packages/server/src/schema": {
      preset,
      presetConfig: {
        tsConfigFilePath: "packages/server/tsconfig.json",
      },
      config: {
        contextType: "packages/server/src/db/models#GqlContext",
        mappers: {
          TextQuestion: "packages/server/src/db/models#TextQuestionDb",
          SelectQuestion: "packages/server/src/db/models#SelectQuestionDb",
          Questionnaire: "packages/server/src/db/models#QuestionnaireDb",
        },
      },
    },
    "./packages/client/src/gql/": {
      preset: "client",
    },
  },
  hooks: { afterOneFileWrite: ["prettier --write"] },
}

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "src/**/schema.graphql",
//   generates: {
//     "src/schema": {
//       preset: serverPreset,
//       // config: {
//       //   contextType: "src/db/models#GqlContext",
//       //   mappers: {
//       //     TextQuestion: "src/db/models#TextQuestionDb",
//       //     SelectQuestion: "src/db/models#SelectQuestionDb",
//       //     Questionnaire: "src/db/models#QuestionnaireDb",
//       //   },
//       // },
//     },
//   },
// }

export default config
