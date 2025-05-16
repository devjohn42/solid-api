import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsService } from './fetch-nearby-gyms.service'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Javascript Gym',
      description: null,
      phone: null,
      latitude: -22.8130816,
      longitude: -43.0178304,
    })

    await gymsRepository.create({
      title: 'Far Node Gym',
      description: null,
      phone: null,
      latitude: -22.9013935,
      longitude: -43.0986054,
    })

    const { gyms } = await sut.gymExecute({
      userLatitude: -22.8130816,
      userLongitude: -43.0178304,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Javascript Gym' }),
    ])
  })
})
