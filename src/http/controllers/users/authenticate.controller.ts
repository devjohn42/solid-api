import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateService = makeAuthenticateService()

    const { user } = await authenticateService.authenticateExecute({
      email,
      password,
    })

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '3d',
        },
      },
    )

    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/', // Quais rotas terão acesso ao cookie (Todas as rotas)
        secure: true, // Define que o cookie será encriptado através do HTTPs
        sameSite: true, // O Cookie só será acessível dentro do memso site/domínio
        httpOnly: true, // O Cookie só podera ser acessado pelo back-end da aplicação
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).send({
        message: error.message,
      })
    }
    throw error
  }
}
