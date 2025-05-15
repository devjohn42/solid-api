import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorie'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from 'generated/prisma/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './check-in.service'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Register Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gymId-1',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -22.8130816,
      longitude: -43.0178304,
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
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
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

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gymId-2',
      title: 'Node Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.722697),
      longitude: new Decimal(-42.8077368),
    })

    await expect(
      sut.CheckInExecute({
        gymId: 'gymId-2',
        userId: 'userId-1',
        userLatitude: -22.8130816,
        userLongitude: -43.0178304,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
