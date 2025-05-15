import { GymsRepository } from '@/repositories/gyms-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { Gym, User } from 'generated/prisma'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateGymUserRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) { }

  async userExecute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUserRequest): Promise<CreateGymServiceResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
