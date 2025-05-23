import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const search = async (req: FastifyRequest, res: FastifyReply) => {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(req.query)

  const searchGymsService = makeSearchGymsService()

  const { gyms } = await searchGymsService.gymExecute({
    query,
    page,
  })

  return res.status(200).send({
    gyms,
  })
}
