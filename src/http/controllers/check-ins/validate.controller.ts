import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const validate = async (req: FastifyRequest, res: FastifyReply) => {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(req.params)

  const validateCheckInService = makeValidateCheckInService()

  await validateCheckInService.CheckInExecute({
    checkInId,
  })

  return res.status(204).send()
}
