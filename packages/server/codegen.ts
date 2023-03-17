import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema.graphql",
  generates: {
    "src/generated/graphql.ts": {
      config: {
        contextType: "src/db/models#GqlContext",
        mappers: {
          TextQuestion: "src/db/models#TextQuestionDb",
          SelectQuestion: "src/db/models#SelectQuestionDb",
          Questionnaire: "src/db/models#QuestionnaireDb",
        },
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
}

export default config
