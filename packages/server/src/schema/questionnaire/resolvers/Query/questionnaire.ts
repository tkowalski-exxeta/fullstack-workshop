import type { QueryResolvers } from "./../../../types.generated"
export const questionnaire: NonNullable<
  QueryResolvers["questionnaire"]
> = async (_, { id }, { db }) => {
  return db.questionnaires[id]
}
