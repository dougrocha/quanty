import { authRouter } from './router/auth'
import { guildRouter } from './router/guild'
import { userRouter } from './router/user'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  guild: guildRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
