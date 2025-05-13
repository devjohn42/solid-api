import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { CheckIn } from 'generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

// PRISMA
// CheckInCreateInput => Serve para quando o CheckIn esteja sendo criado, também criar um registro em outra tabela que é relacionamento da tabela de CheckIn
// !==
// CheckInUncheckedCreateInput => Ele possue os campos de relacioanamento (user_id | gym_id)

interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}
// type CheckInServiceResponse = void // evita erros (TODO)

export class CheckInService {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) { }

  async CheckInExecute({
    userId,
    gymId,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calculate distance between user and gym

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
