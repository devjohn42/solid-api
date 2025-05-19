import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositorie'
import { GetUserProfileService } from '../get-user-profile.service'

export const makeGetUserProfileService = () => {
  const usersRepository = new PrismaUsersRepository()
  const service = new GetUserProfileService(usersRepository)

  return service
}
