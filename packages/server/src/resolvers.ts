import { ObjectId } from "mongodb";
import { Resolvers } from "./generated.types";

export const resolvers: Resolvers = {
  Query: {
    form: async (_parent, { id }, context) =>
      await context.db.forms.findOne({ _id: new ObjectId(id) }),
    forms: async (_parent, _args, context) => await context.db.forms.find(),
  },
  Mutation: {
    createForm: async (_parent, { form }, context) => {
      const result = await context.db.forms.insertOne({
        questions: [],
        ...form,
      });
      const formCreated = await context.db.forms.findOne({
        _id: new ObjectId(result.insertedId),
      });
      return formCreated;
    },
    createQuestion: async (_parent, { formId, question }, context) => {
      const input = question.select ?? question.text;
      const type = !!question.select ? "SelectQuestion" : "TextQuestion";
      const questionCreated = {
        _id: new ObjectId(),
        questionType: type,
        ...input,
      };
      const result = await context.db.forms.updateOne(
        { _id: new ObjectId(formId) },
        { $push: { questions: questionCreated } }
      );
      return questionCreated;
    },
    updateForm: async (_parent, { formId, form }, context) => {
      await context.db.forms.updateOne(
        { _id: new ObjectId(formId) },
        { $set: form }
      );
      const formUpdated =  await context.db.forms.findOne({ _id: new ObjectId(formId) });
      return formUpdated;
    },
    updateQuestion: async (_parent, { formId, questionId, question }, context) => {
      const input = question.select ?? question.text;
      const type = !!question.select ? "SelectQuestion" : "TextQuestion";
      const questionUpdated = {
        _id: new ObjectId(questionId),
        questionType: type,
        ...input,
      }
      const result = await context.db.forms.updateOne(
        { _id: new ObjectId(formId), "questions._id": new ObjectId(questionId) },
        { $set: { "questions.$": questionUpdated } }
      );
      return questionUpdated;
    },
    deleteForm: async (_parent, { formId }, context) => {
      const result = await context.db.forms.deleteOne({ _id: new ObjectId(formId) });
      return result.deletedCount === 1;
    },
    deleteQuestion: async (_parent, { formId, questionId }, context) => {
      const result = await context.db.forms.updateOne(
        { _id: new ObjectId(formId) },
        { $pull: { questions: { _id: new ObjectId(questionId) } } }
      );
      return result.modifiedCount === 1;
    }
  },
  Question: {
    __resolveType: (question) => {
      switch (question.questionType) {
        case "SelectQuestion":
          return "SelectQuestion";
        case "TextQuestion":
          return "TextQuestion";
        default:
          throw Error(`Question type ${question.questionType} is invalid.`);
      }
    },
  },
};
