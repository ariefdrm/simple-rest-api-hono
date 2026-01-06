import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'

const auth = new Hono()

auth.post('/', async (c) => {
  const { name } = await c.req.json()
  if (!name) {
    return c.json({ message: "credential Not Found" }, 403)
  }

  const token = await sign({ name }, String(process.env.SECRET))

  return c.json({ token })
})

auth.get('/verify', async (c) => {
  const authorization = c.req.header('Authorization')
  const token = authorization?.replace('Bearer ', '')

  if (!token) {
    return c.json({ message: "Unauthorized" }, 401)
  }

  const decodeToken = await verify(token, String(process.env.SECRET))

  return c.json({ payload: decodeToken })
})

export default auth
