import { sign, verify } from 'hono/jwt'
import { JWTPayload } from 'hono/utils/jwt/types'

export async function jwtSign(payload: JWTPayload, secret: string): Promise<string> {
  return await sign(payload, secret)
}

export async function verifyJwt(token: string, secret: string): Promise<boolean> {
  try {
    await verify(token, secret)

    return true
  } catch (error) {
    return false
  }
}
