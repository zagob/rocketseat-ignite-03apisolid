import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/inMemory/InMemoryGymsRepository'
import { FetchNearbyGymUseCase } from './fetchNearbyGymsUseCase'

let inMemoryGymsRepository: InMemoryGymsRepository
let fetchNearbyGymUseCase: FetchNearbyGymUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    fetchNearbyGymUseCase = new FetchNearbyGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.3230064,
      longitude: -49.0532733,
    })

    await inMemoryGymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -22.4847568,
      longitude: -48.9723825,
    })

    const { gyms } = await fetchNearbyGymUseCase.execute({
      userLatitude: -22.3230064,
      userLongitude: -49.0532733,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
