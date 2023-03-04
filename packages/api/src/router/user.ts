import { TRPCError } from '@trpc/server'
import type { APIGuild } from 'discord-api-types/v10'
import { PrismaClient } from '@quanty/db'

import { createTRPCRouter, protectedProcedure } from '../trpc'
import { getUserAccount, handleDiscordApiError } from '../util'

export const userRouter = createTRPCRouter({
  guilds: protectedProcedure.query(async ({ ctx }) => {
    return await getUserGuilds(ctx.session.user.id, ctx.prisma)
  }),
  discordId: protectedProcedure.query(async ({ ctx }) => {
    return await getUserAccount(ctx.session.user.id, ctx.prisma, {
      providerAccountId: true,
    })
  }),
  managedGuilds: protectedProcedure.query(async ({ ctx }) => {
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

  return await fetch('https://discord.com/api/v10/users/@me/guilds', {
    headers: {
      authorization: `${userAccount?.token_type} ${userAccount?.access_token}`,
    },
  }).then(res => {
    handleDiscordApiError(res)
    return res.json() as Promise<APIGuild[]>
  })
}

const getBotGuilds = async () => {
  return await fetch('https://discord.com/api/v10/users/@me/guilds', {
    headers: {
      authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
    },
  }).then(res => {
    handleDiscordApiError(res)
    return res.json() as Promise<APIGuild[]>
  })
}
