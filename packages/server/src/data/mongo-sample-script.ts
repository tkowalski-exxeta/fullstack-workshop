import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { connectToDB } from "../db/db_context";
import { FormAnswersDB, QuestionDB } from "../db/types";

dotenv.config();

async function main() {
  const db = await connectToDB();

  // create a form
  const formInsertationResult = await db.forms.insertOne({
    _id: new ObjectId(),
    title: "form #1",
    questions: [],
  });

  // add questions to a form
  const q1: QuestionDB = {
    _id: new ObjectId(),
    type: "select",
    question: "What is your favorite number?",
    options: ["0", "1", "42", "256"],
    multiSelect: false,
  };
  const q2: QuestionDB = {
    _id: new ObjectId(),
    type: "text",
    question: "Why do you like it best?",
  };

  await db.forms.updateOne(
    { _id: formInsertationResult.insertedId },
    { $push: { questions: { $each: [q1, q2] } } },
  );

  const a1: FormAnswersDB = {
    _id: new ObjectId(),
    formId: formInsertationResult.insertedId,
    answers: [
      { _id: q1._id, result: "42" },
      {
        _id: q2._id,
        result: "Because I like 'hitchhickers guide to the galaxy'",
      },
    ],
  };
  const a2: FormAnswersDB = {
    _id: new ObjectId(),
    formId: formInsertationResult.insertedId,
    answers: [
      {
        _id: q1._id,
        result: "256",
      },
      { _id: q2._id, result: "my favorite power of 2" },
    ],
  };
  await db.answers.insertMany([a1, a2]);

  const answeresForSingleForm = await db.answers
    .find({ formId: formInsertationResult.insertedId })
    .limit(20)
    .toArray();
  console.log(answeresForSingleForm);

  const questionsWithAnswers = await db.forms
    .aggregate<{ question: string; answer: string }>([
      { $match: { _id: formInsertationResult.insertedId } },
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "formId",
          as: "formAnswers",
        },
      },
      { $unwind: "$formAnswers" },
      {
        $project: {
          _id: "$formAnswers._id",
          questions: "$questions",
          answers: "$formAnswers.answers",
        },
      },
    ])
    .toArray();

  console.log(questionsWithAnswers);

  // // delete a single question from the array of questions within a form
  // await db.forms.updateOne(
  //   { _id: formInsertationResult.insertedId },
  //   { $pull: { questions: { _id: q1._id } } }
  // )

  // // delete the form
  // await db.forms.deleteOne({
  //   _id: new ObjectId(formInsertationResult.insertedId),
  // })
}

main();
