import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { SearchGymUseCase } from '../searchGym/searchGymUseCase'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(gymsRepository)

  return useCase
}
