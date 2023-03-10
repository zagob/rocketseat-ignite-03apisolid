import { makeValidateCheckInUseCase } from '@/useCases/factories/makeValidateCheckInUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validatecheckInUseCase = makeValidateCheckInUseCase()

  await validatecheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
