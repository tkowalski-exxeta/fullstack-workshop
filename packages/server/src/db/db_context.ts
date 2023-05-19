import { MongoClient } from "mongodb"
import { FormAnswersDB, FormDB } from "./types"

export async function connectToDB() {
  const client = await MongoClient.connect(
    process.env.MONGO_URL ?? "mongodb://localhost:27017"
  )
  const db = client.db(process.env.MONGO_DATABASE ?? "form-sample")
  return {
    db,
    forms: db.collection<FormDB>("forms"),
    answers: db.collection<FormAnswersDB>("answers"),
  }
}

export type DbContext = Awaited<ReturnType<typeof connectToDB>>
