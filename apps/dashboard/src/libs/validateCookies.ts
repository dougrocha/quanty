import { GetServerSidePropsContext } from 'next'

export const validateCookies = (ctx: GetServerSidePropsContext) => {
  const sessionId = ctx.req.cookies['connect.sid']

  return sessionId
    ? {
        Cookie: `connect.sid=${sessionId}`,
      }
    : false
}
