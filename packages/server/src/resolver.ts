import { ObjectId } from "mongodb";
import { getUser } from "./auth";
import { FormDB, QuestionDB } from "./db/types";
import { QuestionInput, Resolvers } from "./generated.types";

export const resolvers: Resolvers = {
  Mutation: {
    login: (_root, { username, password }, { db }) => {
      return getUser(username, password);
    },
    saveForm: async (_root, { form }, { db }) => {
      const formDB: FormDB = {
        _id: form._id ? new ObjectId(form._id) : new ObjectId(),
        title: form.title,
        questions: form.questions.map(toQuestionDB),
      };
      await db.forms.replaceOne({ _id: formDB._id }, formDB, { upsert: true });
      return formDB;
    },
    deleteForm: async (_root, { formId }, { db }) => {
      const result = await db.forms.deleteOne({ _id: new ObjectId(formId) });
      return result.deletedCount === 1;
    },
    submitAnswers: async (_root, { formId, answers }, { db }) => {
      const result = await db.answers.insertOne({
        _id: new ObjectId(),
        formId: new ObjectId(formId),
        answers: answers.map((d) => ({
          _id: new ObjectId(d.questionId),
          result: d.answer ?? [],
        })),
      });
      return result.insertedId.toHexString();
    },
  },
  Query: {
    forms: async (_root, _args, { db }) => {
      return db.forms.find().toArray();
    },
    formById: async (_root, { id }, { db }) => {
      return db.forms.findOne({ _id: new ObjectId(id) });
    },
  },
  Question: {
    __resolveType: (question) => {
      switch (question.type) {
        case "select":
          return "SelectQuestion";
        case "text":
          return "TextQuestion";
        default:
          throw Error(`Question type is invalid.`);
      }
    },
  },
};

function toQuestionDB(q: QuestionInput): QuestionDB {
  const input = q.select ?? q.text;
  const type = !!q.select ? "select" : "text";
  return {
    _id: new ObjectId(),
    type: type,
    ...(input as any),
  };
}
