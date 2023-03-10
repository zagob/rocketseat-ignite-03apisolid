import { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/users/authenticate'
import { profile } from '../controllers/users/profile'
import { refresh } from '../controllers/users/refresh'
import { register } from '../controllers/users/register'
import { VerifyJWT } from '../middlewares/verifyJwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  // Authenticated
  app.get('/me', { onRequest: [VerifyJWT] }, profile)
}
