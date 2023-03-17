import crypto from "node:crypto"
import { SelectQuestionDB, TextQuestionDB } from "../../../../db/models"
import type { MutationResolvers } from "./../../../types.generated"

export const createQuestion: NonNullable<
  MutationResolvers["createQuestion"]
> = async (_, { formId, question }, { db }) => {
  const form = db.questionnaires[formId]
  if (!form) {
    throw Error("Form not found")
  }
  const _id = crypto.randomUUID()
  if (question.text) {
    const q: TextQuestionDB = {
      _id,
      __typename: "TextQuestion",
      type: "text",
      ...question.text,
    }
    form.questions.push(q)
    return q
  } else if (question.select) {
    const q: SelectQuestionDB = {
      _id,
      __typename: "SelectQuestion",
      type: "select",
      ...question.select!,
    }
    form.questions.push(q)
    return q
  }
  throw Error("Unknown question type")
}
