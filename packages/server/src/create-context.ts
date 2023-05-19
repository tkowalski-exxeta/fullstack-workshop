import { DbContext, connectToDB } from "./db/db_context"

export type GqlContext = {
  db: DbContext
}

export const createContext = async (): Promise<GqlContext> => {
  const db = await connectToDB()
  return { db }
}
