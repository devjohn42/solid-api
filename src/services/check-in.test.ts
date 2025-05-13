import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorie'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from 'generated/prisma/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './check-in.service'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Register Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gymId-1',
      title: 'JaaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.CheckInExecute({
      gymId: 'gymId-1',
      userId: 'userId-1',
      userLatitude: -22.8130816,
      userLongitude: -43.0178304,
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
      userLatitude: -22.8130816,
      userLongitude: -43.0178304,
    })

    await expect(() =>
      sut.CheckInExecute({
        gymId: 'gymId-1',
        userId: 'userId-1',
        userLatitude: -22.8130816,
        userLongitude: -43.0178304,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 12, 8, 0, 0))

    await sut.CheckInExecute({
      gymId: 'gymId-1',
      userId: 'userId-1',
      userLatitude: -22.8130816,
      userLongitude: -43.0178304,
    })

    vi.setSystemTime(new Date(2022, 0, 13, 8, 0, 0))

    const { checkIn } = await sut.CheckInExecute({
      gymId: 'gymId-1',
      userId: 'userId-1',
      userLatitude: -22.8130816,
      userLongitude: -43.0178304,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
