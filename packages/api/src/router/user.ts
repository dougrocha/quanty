import { TRPCError } from '@trpc/server'
import type { APIGuild } from 'discord-api-types/v10'
import { PrismaClient } from '@quanty/db'

import { createTRPCRouter, protectedProcedure } from '../trpc'
import { getUserAccount } from '../util'

export const userRouter = createTRPCRouter({
  getGuilds: protectedProcedure.query(async ({ ctx }) => {
    return await getUserGuilds(ctx.session.user.id, ctx.prisma)
  }),
  getDiscordId: protectedProcedure.query(async ({ ctx }) => {
    return await getUserAccount(ctx.session.user.id, ctx.prisma, {
      providerAccountId: true,
    })
  }),
  getManagedGuilds: protectedProcedure.query(async ({ ctx }) => {
    const [userGuilds, botGuilds] = await Promise.all([
      getUserGuilds(ctx.session.user.id, ctx.prisma),
      getBotGuilds(),
    ])

    return userGuilds
      .map(guild => ({
        ...guild,
        bot: !!botGuilds.find(botGuild => botGuild.id === guild.id),
      }))
      .filter(guild => isAdmin(guild.permissions))
  }),
})

const isAdmin = (permissions: string | undefined) => {
  return (parseInt(permissions || '') & 0x8) === 0x8
}

const getUserGuilds = async (userId: string, prisma: PrismaClient) => {
  const userAccount = await getUserAccount(userId, prisma, {
    access_token: true,
    token_type: true,
  })

  if (!userAccount) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User account not found.',
    })
  }

  if (!userAccount.access_token || !userAccount.token_type) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'User account is missing access token.',
    })
  }

  return await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      authorization: `${userAccount.token_type} ${userAccount.access_token}`, // Bearer token
    },
  })
    .then(res => {
      switch (res.status) {
        case 401:
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Unauthorized',
          })
        case 429:
          throw new TRPCError({
            code: 'TOO_MANY_REQUESTS',
            message: 'Too many requests',
          })
        default:
          return res
      }
    })
    .then(res => res.json() as Promise<APIGuild[]>)
}

const getBotGuilds = async () => {
  return await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`, // Bearer token
    },
  }).then(res => res.json() as Promise<APIGuild[]>)
}
