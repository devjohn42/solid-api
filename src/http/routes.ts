import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate.controller'
import { register } from './controllers/register.controller'

export const appRoutes = async (app: FastifyInstance) => {
  // Tradução de rotas para entidades
  app.post('/users', register) // criando um usuário

  app.post('/sessions', authenticate) // criando uma sessão
}
