import { DbContext, connectToDB } from "./db/db_context"
import {UserInfo, userFromRequest} from './auth'
import { YogaInitialContext } from "graphql-yoga"

export type GqlContext = {
  db: DbContext
  user: UserInfo | null
}

export const createContext = async (): Promise<(ctx: YogaInitialContext) => GqlContext> => {
  const db = await connectToDB()
  return (ctx: YogaInitialContext) => {
    const user = userFromRequest(ctx.request.headers["Authorization"])
    return { db, user }}
}
