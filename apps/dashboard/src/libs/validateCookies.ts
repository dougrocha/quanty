import { GetServerSidePropsContext } from 'next'

export const validateCookies = (ctx: GetServerSidePropsContext) => {
  const sessionId = ctx.req.cookies['session']

  return sessionId
    ? {
        Cookie: `session=${sessionId}`,
      }
    : false
}
