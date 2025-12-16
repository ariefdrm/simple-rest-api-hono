import { Hono } from 'hono'
import { logger } from 'hono/logger'
import user from './routes/user.route'
import { sign, verify } from 'hono/jwt'

const app = new Hono()
app.use(logger())

app.post('/auth', async (c) => {
  const { name } = await c.req.json()

  if (!name) {
    return c.json({ message: "credential Not Found" }, 403)
  }

  const token = await sign({ name }, String(process.env.SECRET))

  return c.json({ token })
})

app.get('/verify', async (c) => {
  const authorization = c.req.header('Authorization')
  const token = authorization?.replace('Bearer', '')

  if (!token) {
    return c.json({ message: "Unauthorized" }, 401)
  }

  const decodeToken = await verify(token, String(process.env.SECRET))

  return c.json({ payload: decodeToken })
})

app.route('/users', user)

app.notFound((c) => {
  return c.json({
    data: "Not Found"
  }, 404)
})

export default app
