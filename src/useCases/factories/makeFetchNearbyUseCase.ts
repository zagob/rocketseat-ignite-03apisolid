import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { FetchNearbyGymUseCase } from '../fetchNearbyGyms/fetchNearbyGymsUseCase'

export function makeFetchNearbyUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymUseCase(gymsRepository)

  return useCase
}
