// import { ObjectId } from "mongodb";
// import { GqlContext } from "./create-context";
// import { FormDB, QuestionDB } from "./db/types";
// import { QuestionInput, Resolvers } from "./generated.types";
// import { getUser } from "./auth";

// export const resolvers: Resolvers<GqlContext> = {
//   Mutation: {
//     saveForm: async (_root, { form }, { db }) => {
//       const id = form._id ? new ObjectId(form._id) : new ObjectId();
//       const formDB: FormDB = {
//         _id: id,
//         title: form.title,
//         questions: form.questions.map(toQuestionDB),
//       };
//       await db.forms.replaceOne({ _id: id }, formDB, {
//         upsert: true,
//       });
//       return formDB;
//     },
//     deleteForm: async (_root, { formId }, { db }) => {
//       const result = await db.forms.deleteOne({
//         _id: new ObjectId(formId),
//       });
//       return result.deletedCount === 1;
//     },
//     submitFormAnswer: async (_root, { formId, data }, { db }) => {
//       const result = await db.answers.insertOne({
//         _id: new ObjectId(),
//         formId: new ObjectId(formId),
//         answers: data.map((d) => ({
//           _id: new ObjectId(d.id),
//           result: d.result ?? undefined,
//         })),
//       });
//       return result.insertedId.toHexString();
//     },
//   },
//   Query: {
//     forms: async (_root, _args, { db }) => {
//       return db.forms.find().toArray();
//     },
//     formById: async (_root, { id }, { db }) => {
//       return db.forms.findOne({ _id: new ObjectId(id) });
//     },
//   },
//   Question: {
//     __resolveType: (question) => {
//       switch (question.type) {
//         case "select":
//           return "SelectQuestion";
//         case "text":
//           return "TextQuestion";
//         default:
//           throw Error(`Question type is invalid.`);
//       }
//     },
//   },
// };

// function toQuestionDB(q: QuestionInput): QuestionDB {
//   const input = q.select ?? q.text;
//   const type = !!q.select ? "select" : "text";
//   return {
//     _id: new ObjectId(),
//     type: type,
//     ...(input as any),
//   };
// }

import { ObjectId } from "mongodb"
import { GqlContext } from "./create-context"
import { QuestionDB } from "./db/types"
import { Resolvers } from "./generated.types"
import { getUser } from "./auth"

export const resolvers: Resolvers<GqlContext> = {
  Mutation: {
    login: (_root, { username, password }, { db }) => {
      return getUser(username, password)
    },
    createForm: async (_root, { form }, { db }) => {
      const formDB = {
        _id: new ObjectId(),
        title: form.title,
        questions: [],
      }
      await db.forms.insertOne(formDB)
      return formDB
    },
    createQuestion: async (_root, { formId, question }, { db }) => {
      const input = question.select ?? question.text
      const type = !!question.select ? "select" : "text"
      const questionCreated: QuestionDB = {
        _id: new ObjectId(),
        type: type,
        ...(input as any),
      }
      const res = await db.forms.updateOne(
        { _id: new ObjectId(formId) },
        { $push: { questions: questionCreated } }
      )
      return res.matchedCount === 1 ? questionCreated : null
    },
    updateForm: async (_root, { formId, form }, { db }) => {
      await db.forms.updateOne({ _id: new ObjectId(formId) }, { $set: form })
      const formUpdated = await db.forms.findOne({
        _id: new ObjectId(formId),
      })
      return formUpdated
    },
    updateQuestion: async (_root, { formId, questionId, question }, { db }) => {
      const input = question.select ?? question.text
      const type = !!question.select ? "select" : "text"
      const questionUpdated: QuestionDB = {
        _id: new ObjectId(questionId),
        type: type,
        ...(input as any),
      }
      const result = await db.forms.updateOne(
        {
          _id: new ObjectId(formId),
          "questions._id": new ObjectId(questionId),
        },
        { $set: { "questions.$": questionUpdated } }
      )
      return result.matchedCount === 1 ? questionUpdated : null
    },
    deleteForm: async (_root, { formId }, { db }) => {
      const result = await db.forms.deleteOne({
        _id: new ObjectId(formId),
      })
      return result.deletedCount === 1
    },
    deleteQuestion: async (_root, { formId, questionId }, { db }) => {
      const result = await db.forms.updateOne(
        { _id: new ObjectId(formId) },
        { $pull: { questions: { _id: new ObjectId(questionId) } } }
      )
      return result.modifiedCount === 1
    },
  },
  Query: {
    forms: async (_root, _args, { db }) => {
      return db.forms.find().toArray()
    },
    formById: async (_root, { id }, { db }) => {
      return db.forms.findOne({ _id: new ObjectId(id) })
    },
  },
  Question: {
    __resolveType: (question) => {
      switch (question.type) {
        case "select":
          return "SelectQuestion"
        case "text":
          return "TextQuestion"
        default:
          throw Error(`Question type is invalid.`)
      }
    },
  },
}
