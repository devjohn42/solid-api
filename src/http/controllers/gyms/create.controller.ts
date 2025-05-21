import { makeCreateGymService } from '@/services/factories/make-create-gym-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const create = async (req: FastifyRequest, res: FastifyReply) => {
  const createGymsBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    createGymsBodySchema.parse(req.body)

  const createGymService = makeCreateGymService()

  await createGymService.gymExecute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return res.status(201).send()
}
