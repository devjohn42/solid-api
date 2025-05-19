import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositorie'
import { RegisterService } from '../register.service'

export const makeRegisterService = () => {
  const usersRepository = new PrismaUsersRepository()
  const service = new RegisterService(usersRepository)

  return service
}
