import crypto from "node:crypto"
import type {
  MutationResolvers,
  Questionnaire,
} from "./../../../types.generated"

export const createForm: NonNullable<MutationResolvers["createForm"]> = async (
  _,
  { form },
  { db }
) => {
  const _id = crypto.randomUUID()
  const questionnaire: Questionnaire = {
    _id,
    __typename: "Questionnaire",
    title: form.title,
    questions: [],
  }
  return (db.questionnaires[_id] = questionnaire)
}
