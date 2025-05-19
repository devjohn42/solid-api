import { FastifyReply, FastifyRequest } from 'fastify'

export const profile = async (req: FastifyRequest, res: FastifyReply) => {
  await req.jwtVerify()

  console.log(req.user.sub)

  return res.status(200).send()
}
