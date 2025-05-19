import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInService } from '../validate.check-in.service'

export const makeValidateCheckInService = () => {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new ValidateCheckInService(checkInsRepository)

  return service
}
