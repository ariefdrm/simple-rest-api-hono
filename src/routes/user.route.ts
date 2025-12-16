import { Hono } from "hono";
import { prisma } from "../configs/db.config";
import { User } from "../utils/UserScheme";
import { jwt } from "hono/jwt";

const user = new Hono()

user.use('/*', jwt({
  secret: String(process.env.SECRET)
}))

// get all data
user.get('/', async (c) => {
  const data = await prisma.users.findMany({ orderBy: { id: 'asc' } })

  return c.json({ data: data })
})

// get specific data from user "id"
user.get('/:id', async (c) => {
  const id = c.req.param('id')
  const users = await prisma.users.findMany({
    where: {
      id: Number(id)
    }
  })
  const length = users.length

  if (length === 0) {
    return c.json({ data: "Not Found" }, 404)
  }

  return c.json(users, 200);
})

// add new data 
user.post('/', async (c) => {
  const { name } = await c.req.json()

  if (name) {
    await prisma.users.create({
      data: {
        name
      }
    })
    return c.json({ message: "user data successfully created", name }, 201)
  }

  return c.json({ message: "failed to create a new user", name }, 422)
})

user.patch('/:id', async (c) => {
  const id = c.req.param('id')
  const data: User = await c.req.json()

  await prisma.users.update({
    data: {
      name: data.name
    },
    where: {
      id: Number(id)
    }
  })

  return c.json({ message: 'update data successfully', data })
})

user.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'))

  const userData = await prisma.users.findUnique({
    where: { id }
  })

  if (!userData) {
    return c.json({ message: 'User not found' }, 404)
  }

  await prisma.users.delete({
    where: { id }
  })

  return c.json({ message: 'Data successfully deleted' })
})

export default user
