import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorie'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './check-in.service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Register Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 12, 8, 0, 0))

    const { checkIn } = await sut.CheckInExecute({
      gymId: 'gymId-1',
      userId: 'userId-1',
    })

    // console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // TDD
  // Especificar ao máximo o test unitário

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 12, 8, 0, 0))

    await sut.CheckInExecute({
      gymId: 'gymId-1',
      userId: 'userId-1',
    })

    await expect(() =>
      sut.CheckInExecute({
        gymId: 'gymId-1',
        userId: 'userId-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 12, 8, 0, 0))

    await sut.CheckInExecute({
      gymId: 'gymId-1',
      userId: 'userId-1',
    })

    vi.setSystemTime(new Date(2022, 0, 13, 8, 0, 0))

    const { checkIn } = await sut.CheckInExecute({
      gymId: 'gymId-1',
      userId: 'userId-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
