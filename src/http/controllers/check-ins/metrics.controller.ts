import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export const metrics = async (req: FastifyRequest, res: FastifyReply) => {
  const getUserMetricsService = makeGetUserMetricsService()

  const { checkInsCount } = await getUserMetricsService.checkInExecute({
    userId: req.user.sub,
  })

  return res.status(201).send({
    checkInsCount,
  })
}
