import { FastifyInstance } from 'fastify'
import { create } from '../controllers/gyms/create'
import { nearby } from '../controllers/gyms/nearby'
import { search } from '../controllers/gyms/search'
import { VerifyJWT } from '../middlewares/verifyJwt'
import { VerifyUserRole } from '../middlewares/verifyUserRole'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [VerifyUserRole('ADMIN')] }, create)
}
