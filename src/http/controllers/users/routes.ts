import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt.middleware'
import { authenticate } from './authenticate.controller'
import { profile } from './profile.controller'
import { register } from './register.controller'

export const usersRoutes = async (app: FastifyInstance) => {
  // Tradução de rotas para entidades
  app.post('/users', register) // criando um usuário
  app.post('/sessions', authenticate) // criando uma sessão

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
