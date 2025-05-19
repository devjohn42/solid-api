import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositorie'
import { AuthenticateService } from '../authenticate.service'

export const makeAuthenticateService = () => {
  const usersRepository = new PrismaUsersRepository()
  const service = new AuthenticateService(usersRepository)

  return service
}
