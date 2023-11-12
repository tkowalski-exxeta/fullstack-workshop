import { ObjectId } from "mongodb";
import { QuestionDB } from "./db/types";
import { Resolvers } from "./generated.types";
import { getUser } from "./auth";

export const resolvers: Resolvers = {
  Mutation: {
    login: (_root, { username, password }, { db }) => {
      return getUser(username, password);
    },
    createForm: async (_root, { form }, { db }) => {
      const formDB = {
        _id: new ObjectId(),
        title: form.title,
        questions: [],
      };
      await db.forms.insertOne(formDB);
      return formDB;
    },

    createQuestion: async (_root, { formId, question }, { db }) => {
      const input = question.select ?? question.text;
      const type = !!question.select ? "select" : "text";
      const questionCreated: QuestionDB = {
        _id: new ObjectId(),
        type: type,
        ...(input as any),
      };
      const res = await db.forms.updateOne(
        { _id: new ObjectId(formId) },
        { $push: { questions: questionCreated } },
      );
      return res.matchedCount === 1 ? questionCreated : null;
    },
    updateForm: async (_root, { formId, form }, { db }) => {
      await db.forms.updateOne({ _id: new ObjectId(formId) }, { $set: form });
      const formUpdated = await db.forms.findOne({
        _id: new ObjectId(formId),
      });
      return formUpdated;
    },
    updateQuestion: async (_root, { formId, questionId, question }, { db }) => {
      const input = question.select ?? question.text;
      const type = !!question.select ? "select" : "text";
      const questionUpdated: QuestionDB = {
        _id: new ObjectId(questionId),
        type: type,
        ...(input as any),
      };
      const result = await db.forms.updateOne(
        {
          _id: new ObjectId(formId),
          "questions._id": new ObjectId(questionId),
        },
        { $set: { "questions.$": questionUpdated } },
      );
      return result.matchedCount === 1 ? questionUpdated : null;
    },
    deleteForm: async (_root, { formId }, { db }) => {
      const result = await db.forms.deleteOne({
        _id: new ObjectId(formId),
      });
      return result.deletedCount === 1;
    },
    deleteQuestion: async (_root, { formId, questionId }, { db }) => {
      const result = await db.forms.updateOne(
        { _id: new ObjectId(formId) },
        { $pull: { questions: { _id: new ObjectId(questionId) } } },
      );
      return result.modifiedCount === 1;
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
