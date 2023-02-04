import { Prisma, PrismaClient } from '@quanty/db'

export const getUserAccount = async (
  userId: string,
  prisma: PrismaClient,
  select: Prisma.AccountSelect = {},
) => {
  return await prisma.account.findFirst({
    where: {
      userId,
      provider: 'discord',
    },
    select,
  })
}
