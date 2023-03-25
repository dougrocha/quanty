import { authRouter } from './router/auth'
import { guildRouter } from './router/guild'
import { userRouter } from './router/user'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  guild: guildRouter,
})

// Use this to log errors
// *.ts - structured logging from client, edge, or server-side files
// import { log } from 'next-axiom'
// log.debug('new sign-in challenge', { customerId: 32423, auth: 'session' })

// export type definition of API
export type AppRouter = typeof appRouter
