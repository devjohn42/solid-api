import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt.middleware'
import { create } from './create.controller'
import { nearby } from './nearby.controller'
import { search } from './search.controller'

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', create)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
