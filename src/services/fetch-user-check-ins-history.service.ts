import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from 'generated/prisma'

// PRISMA
// CheckInCreateInput => Serve para quando o CheckIn esteja sendo criado, também criar um registro em outra tabela que é relacionamento da tabela de CheckIn
// !==
// CheckInUncheckedCreateInput => Ele possue os campos de relacioanamento (user_id | gym_id)

interface FetchUserCheckInsHistorySericeRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistorySericeResponse {
  checkIns: CheckIn[]
}
// type FetchUserCheckInsHistorySericeResponse = void // evita erros (TODO)

export class FetchUserCheckInsHistorySerice {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async CheckInExecute({
    userId,
    page,
  }: FetchUserCheckInsHistorySericeRequest): Promise<FetchUserCheckInsHistorySericeResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
