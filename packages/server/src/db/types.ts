import { ObjectId } from "mongodb"

export interface FormDB {
  _id: ObjectId
  title: string
  questions: QuestionDB[]
}

export type QuestionDB = SelectQuestionDB | TextQuestionDB

export type SelectQuestionDB = {
  _id: ObjectId
  type: "select"
  question: string
  multiSelect: boolean
  options: string[]
}

export type TextQuestionDB = {
  _id: ObjectId
  type: "text"
  question: string
}

export type FormAnswersDB = {
  _id: ObjectId
  formId: ObjectId
  answers: QuestionAnswerDB[]
}
export type QuestionAnswerDB = {
  _id: ObjectId
  result?: string[] | string | undefined
}
