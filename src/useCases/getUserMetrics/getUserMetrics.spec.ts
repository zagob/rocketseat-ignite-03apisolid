import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { GetUserMetricsUseCase } from './getUserMetricsUseCase'

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(inMemoryCheckInRepository)
  })

  it('should be able to get check in count from metrics', async () => {
    await inMemoryCheckInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await inMemoryCheckInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
