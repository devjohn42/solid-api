import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from 'generated/prisma'

// PRISMA
// CheckInCreateInput => Serve para quando o CheckIn esteja sendo criado, também criar um registro em outra tabela que é relacionamento da tabela de CheckIn
// !==
// CheckInUncheckedCreateInput => Ele possue os campos de relacioanamento (user_id | gym_id)

interface CheckInServiceRequest {
  userId: string
  gymId: string
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}
// type CheckInServiceResponse = void // evita erros (TODO)

export class CheckInService {
  constructor(private checkInRepository: CheckInsRepository) { }

  async CheckInExecute({
    userId,
    gymId,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
