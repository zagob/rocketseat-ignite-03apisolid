import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'
import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { CheckInUseCase } from '../checkIn/checkInUseCase'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
