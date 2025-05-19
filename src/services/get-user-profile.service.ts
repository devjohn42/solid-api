import { UsersRepository } from '@/repositories/users-repository'
import { User } from 'generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileServiceRequest {
  userId: string
}

interface GetUserProfileServiceResponse {
  user: User
}
// type GetUserProfileServiceResponse = void // evita erros (TODO)

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) { }

  async profileExecute({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
