import { ObjectId } from "mongodb";
import { GqlContext } from "./create-context";
import { FormDB, QuestionDB } from "./db/types";

type FormInput = {
  title: string;
};
type FormArgs = {
  form: FormInput;
};
export const resolvers = {
  Mutation: {
    createForm: async (_root, { form }: FormArgs, { db }: GqlContext) => {
      const formDB = {
        _id: new ObjectId(),
        title: form.title,
        questions: [],
      };
      await db.forms.insertOne(formDB);
      return formDB;
    },

    createQuestion: async (_root, { formId, question }, { db }: GqlContext) => {
      const input = question.select ?? question.text;
      const type: QuestionDB["type"] = !!question.select ? "select" : "text";
      const questionCreated: QuestionDB = {
        _id: new ObjectId(),
        type,
        ...input,
      };
      const res = await db.forms.updateOne(
        { _id: new ObjectId(formId) },
        { $push: { questions: questionCreated } }
      );
      return res.matchedCount === 1 ? questionCreated : null;
    },

    updateForm: async (_root, { formId, form }, { db }: GqlContext) => {
      await db.forms.updateOne({ _id: new ObjectId(formId) }, { $set: form });
      const formUpdated = await db.forms.findOne({
        _id: new ObjectId(formId),
      });
      return formUpdated;
    },
    updateQuestion: async (
      _root,
      { formId, questionId, question },
      { db }: GqlContext
    ) => {
      const input = question.select ?? question.text;
      const type = !!question.select ? "SelectQuestion" : "TextQuestion";
      const questionUpdated = {
        _id: new ObjectId(questionId),
        questionType: type,
        ...input,
      };
      const result = await db.forms.updateOne(
        {
          _id: new ObjectId(formId),
          "questions._id": new ObjectId(questionId),
        },
        { $set: { "questions.$": questionUpdated } }
      );
      return result.matchedCount === 1 ? questionUpdated : null;
    },
    deleteForm: async (_root, { formId }, { db }: GqlContext) => {
      const result = await db.forms.deleteOne({
        _id: new ObjectId(formId),
      });
      return result.deletedCount === 1;
    },
    deleteQuestion: async (
      _root,
      { formId, questionId },
      { db }: GqlContext
    ) => {
      const result = await db.forms.updateOne(
        { _id: new ObjectId(formId) },
        { $pull: { questions: { _id: new ObjectId(questionId) } } }
      );
      return result.modifiedCount === 1;
    },
  },
  Query: {
    forms: async (_root, _args, { db }: GqlContext) => {
      return db.forms.find().toArray();
    },
    formById: async (_root, { id, username }, { db }: GqlContext) => {
      return db.forms.findOne({ _id: new ObjectId(id) });
    },
  },
  Form: {
    questions(form: FormDB, _args, { db }: GqlContext) {
      return db.querstion.find({ formId: form._id }).toArray();
    },
  },
  Question: {
    __resolveType: (question: QuestionDB) => {
      switch (question.type) {
        case "select":
          return "SelectQuestion";
        case "text":
          return "TextQuestion";
        default:
          invalidQuestionType(question);
      }
    },
  },
};

function invalidQuestionType(question: never): never {
  throw Error(`Invalid question type: ${question}`);
}
