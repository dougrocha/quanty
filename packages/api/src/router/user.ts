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

    return (
      userGuilds
        .map(guild => {
          const botGuild = botGuilds.find(botGuild => botGuild.id === guild.id)

          return {
            ...guild,
            bot: !!botGuild,
          }
        })
        .filter(guild => isAdmin(guild.permissions))
        // Alphabetical Sort
        .sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
        // Sort Managed Guilds to the top
        .sort((a, b) => {
          if (a.bot && !b.bot) return -1
          if (!a.bot && b.bot) return 1
          return 0
        })
    )
  }),
})

const isAdmin = (permissions: string | undefined) => {
  return (parseInt(permissions || '') & 0x8) === 0x8
}

const getUserGuilds = async (userId: string, prisma: PrismaClient) => {
  const userAccount = await getUserAccount(userId, prisma, {
    access_token: true,
  })

  if (!userAccount) {
    throw new Error('Account cannot be found.')
  }

  if (!userAccount.access_token) {
    throw new Error('Account does not have an access token.')
  }

  const test = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${userAccount.access_token}`, // Bearer token
    },
  }).then(res => res.json() as Promise<APIGuild[]>)

  return test
}

const getBotGuilds = async () => {
  return await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`, // Bearer token
    },
  }).then(res => res.json() as Promise<APIGuild[]>)
}