import { preset as serverPreset } from "@eddeee888/gcg-typescript-resolver-files"
import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/**/schema.graphql",
  generates: {
    "src/schema": {
      preset: serverPreset,
      config: {
        contextType: "src/db/models#GqlContext",
        mappers: {
          TextQuestion: "src/db/models#TextQuestionDb",
          SelectQuestion: "src/db/models#SelectQuestionDb",
          Questionnaire: "src/db/models#QuestionnaireDb",
        },
      },
    },
  },
}

export default config
