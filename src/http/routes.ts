import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate.controller'
import { profile } from './controllers/profile.controller'
import { register } from './controllers/register.controller'
import { verifyJWT } from './middlewares/verify-jwt.middleware'

export const appRoutes = async (app: FastifyInstance) => {
  // Tradução de rotas para entidades
  app.post('/users', register) // criando um usuário
  app.post('/sessions', authenticate) // criando uma sessão

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
