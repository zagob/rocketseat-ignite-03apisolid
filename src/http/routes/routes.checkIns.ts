import { FastifyInstance } from 'fastify'
import { create } from '../controllers/checkIns/create'
import { history } from '../controllers/checkIns/history'
import { metrics } from '../controllers/checkIns/metrics'
import { validate } from '../controllers/checkIns/validate'
import { VerifyJWT } from '../middlewares/verifyJwt'
import { VerifyUserRole } from '../middlewares/verifyUserRole'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [VerifyUserRole('ADMIN')] },
    validate,
  )
}
