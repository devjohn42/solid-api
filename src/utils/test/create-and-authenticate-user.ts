import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John',
    email: 'john@gmail.com',
    password: 'fap@2025',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john@gmail.com',
    password: 'fap@2025',
  })

  const { token } = authResponse.body

  return { token }
}
