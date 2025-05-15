import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymService } from './create-gym.service'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Register Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.userExecute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.8130816,
      longitude: -43.0178304,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
