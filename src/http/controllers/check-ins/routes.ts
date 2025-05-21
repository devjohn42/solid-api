import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt.middleware'
import { create } from './create.controller'
import { history } from './history.controller'
import { metrics } from './metrics.controller'
import { validate } from './validate.controller'

export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', create)
  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
  app.patch('/check-ins/:checkInId/validate', validate)
}
