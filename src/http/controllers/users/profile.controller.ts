import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export const profile = async (req: FastifyRequest, res: FastifyReply) => {
  const getUserProfile = makeGetUserProfileService()

  const { user } = await getUserProfile.profileExecute({
    userId: req.user.sub,
  })

  return res.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
