import crypto from "node:crypto"
import { Resolvers } from "../generated/graphql"
import { GqlContext, SelectQuestionDB, TextQuestionDB } from "./models"

export const resolvers: Resolvers<GqlContext> = {
  Query: {
    questionnaire: (_, { id }, { db }) => {
      return db.questionnaires[id]
    },
  },
  Mutation: {
    createForm: (_, { form }, { db }) => {
      const _id = crypto.randomUUID()
      return (db.questionnaires[_id] = {
        _id,
        title: form.title,
        questions: [],
      })
    },
    createQuestion: (_, { formId, question }, { db }) => {
      const form = db.questionnaires[formId]
      if (!form) {
        throw Error("Form not found")
      }
      const _id = crypto.randomUUID()
      if (question.text) {
        const q: TextQuestionDB = { _id, type: "text", ...question.text }
        form.questions.push(q)
        return q
      } else if (question.select) {
        const q: SelectQuestionDB = { _id, type: "select", ...question.select! }
        form.questions.push(q)
        return q
      }
      throw Error("Unknown question type")
    },
  },
  Question: {
    __resolveType: (root) => {
      if ((root as any).type === "select") {
        return "SelectQuestion"
      }
      return "TextQuestion"
    },
  },
}
