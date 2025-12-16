import { Context, Next } from "hono";
import { verifyJwt } from "../utils/jwt.utils";

export async function checkJwt(c: Context, next: Next) {
  const token = c.req.header('Authorization')

  if (!token) {
    return c.json({ message: "Token Not Found" }, 401)
  }

  const isLegit = await verifyJwt(String(token), String(process.env.SECRET))

  if (!isLegit) {
    return c.json({ message: "Unauthorized token" }, 401)
  }

  await next()
}
