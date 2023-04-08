import { TRPCError } from '@trpc/server'
import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc'
import { Prisma, PrismaClient } from '@quanty/db'

export const getUserAccount = async <
  T extends Prisma.AccountSelect = Prisma.AccountSelect,
>(
  userId: string,
  prisma: PrismaClient,
  select: T,
) => {
  return await prisma.account.findFirst({
    where: {
      userId,
    },
    select,
  })
}

export const handleDiscordApiError = (res: Response) => {
  if (res.ok) return

  let errorCode: TRPC_ERROR_CODE_KEY

  switch (res.status) {
    case 401:
      errorCode = 'UNAUTHORIZED'
      break
    case 429:
      errorCode = 'TOO_MANY_REQUESTS'
      break
    case 403:
      errorCode = 'FORBIDDEN'
      break
    default:
      errorCode = 'INTERNAL_SERVER_ERROR'
  }

  throw new TRPCError({
    code: errorCode,
    message: res.statusText, 
    cause: new Error(res.statusText),
  })
}
