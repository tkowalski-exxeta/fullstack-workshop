import { SelectQuestion, TextQuestion } from "../schema/types.generated"

type UUID = string
// type BaseQuestion =
export type SelectQuestionDB = SelectQuestion & { type: "select" }
export type TextQuestionDB = TextQuestion & { type: "text" }
export type QuestionDb = TextQuestionDB | SelectQuestionDB

export type QuestionnaireDb = {
  _id: UUID
  title: string
  questions: QuestionDb[]
}

export type DbContext = {
  questionnaires: Record<UUID, QuestionnaireDb>
}

export type GqlContext = {
  db: DbContext
}
