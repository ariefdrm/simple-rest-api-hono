import { Hono } from 'hono'
import { logger } from 'hono/logger'
import user from './routes/user.route'
import auth from './routes/auth.route'
import { swaggerUI } from '@hono/swagger-ui'

const app = new Hono()
app.use(logger())

// A basic OpenAPI document
const openApiDoc = {
  openapi: '3.0.0', // This is the required version field
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for your service',
  },
  paths: {
    // Add your API paths here
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    // Add more endpoints as needed
    '/users': {
      get: {
        summary: "users route",
        responses: {
          '200': {
            description: 'OK',
          },
        },
      }
    }
  },
}

// Serve the OpenAPI document
app.get('/doc', (c) => c.json(openApiDoc))

// Use the middleware to serve Swagger UI at /ui
app.get('/ui', swaggerUI({ url: '/doc' }))

app.route('/users', user)
app.route('/auth', auth)

app.notFound((c) => {
  return c.json({
    message: "Not Found"
  }, 404)
})

export default app
