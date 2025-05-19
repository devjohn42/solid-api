import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistorySerice } from '../fetch-user-check-ins-history.service'

export const makeFetchUserCheckInsHistoryService = () => {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new FetchUserCheckInsHistorySerice(checkInsRepository)

  return service
}
