import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorie'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsService } from './get-user-metrics.service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get User Metrics Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-03',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.checkInExecute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(3)
  })
})
