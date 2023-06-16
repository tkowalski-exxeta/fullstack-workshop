import * as jwt from "jsonwebtoken"

const JWT_SECRET = process.env["JWT_SECRET"] ?? "5ecret"

type ROLE = "admin" | "user"

export interface UserInfo {
  _id: string
  roles: ROLE[]
}
interface User extends UserInfo {
  fullname: string
  username: string
  pwd: string
}

const knownUsers: User[] = [
  {
    _id: "64831e68a94b68f66e1c609c",
    fullname: "Thomas Kowalski",
    username: "thko",
    pwd: "thko",
    roles: ["admin"],
  },
  {
    _id: "64831e68a94b68f66e1c609d",
    fullname: "Timothee Glörfeld",
    username: "tigl",
    pwd: "tigl",
    roles: ["admin"],
  },
]

type LoginResponse = { _id: string; name: string; token: string }

export async function getUser(
  username: string,
  password: string
): Promise<LoginResponse | null> {
  const user = knownUsers.find((u) => u.username === username)
  if (user && user.pwd === password) {
    return {
      _id: user._id,
      name: user.fullname,
      token: getToken(user),
    }
  }
  return null
}

export function getToken(user: UserInfo): string {
  return jwt.sign(user, JWT_SECRET)
}

export function userFromRequest(authHeader: string): UserInfo | null {
  const token = authHeader?.replace(/^BEARER /i, "")
  return token ? jwt.verify(token, JWT_SECRET) : null
}
