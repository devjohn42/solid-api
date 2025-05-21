import { makeCheckInService } from '@/services/factories/make-check-in-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const create = async (req: FastifyRequest, res: FastifyReply) => {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createcheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInsParamsSchema.parse(req.params)
  const { latitude, longitude } = createcheckInBodySchema.parse(req.body)

  const createGymService = makeCheckInService()

  await createGymService.CheckInExecute({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return res.status(201).send()
}
