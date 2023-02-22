import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    console.log('Getting Session')
    return ctx.session
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @quanty/auth package
    return 'you can see this secret message!'
  }),
})
