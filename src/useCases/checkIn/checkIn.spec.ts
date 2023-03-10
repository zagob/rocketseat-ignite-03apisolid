import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { CheckInUseCase } from './checkInUseCase'
import { InMemoryGymsRepository } from '@/repositories/inMemory/InMemoryGymsRepository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from '../errors/maxNumberOfCheckInsError'
import { MaxDistanceError } from '../errors/maxDistanceError'

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(
      inMemoryCheckInRepository,
      gymsRepository,
    )

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript GYm',
      phone: '',
      description: '',
      latitude: -22.3212689,
      longitude: -49.0532733,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.3212689,
      userLongitude: -49.0532733,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.3212689,
      userLongitude: -49.0532733,
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.3212689,
        userLongitude: -49.0532733,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 0, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.3212689,
      userLongitude: -49.0532733,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 0, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.3212689,
      userLongitude: -49.0532733,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      phone: '',
      description: '',
      latitude: new Decimal(-22.313964),
      longitude: new Decimal(-49.041772),
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.3212689,
        userLongitude: -49.0532733,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
