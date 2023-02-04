import { PrismaClient } from '@quanty/db'
import { APIGuild } from 'discord-api-types/v10'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { getUserAccount } from '../util'

export const guildRouter = createTRPCRouter({
  getGuild: protectedProcedure
    .input(
      z
        .string({
          required_error: 'Guild ID is required.',
        })
        .min(1),
    )
    .query(async ({ ctx, input }) => {
      const guild = await getBotGuild(input)

      checkGuildAccess({
        guild,
        userId: ctx.session.user.id,
        prisma: ctx.prisma,
      })

      return guild
    }),
})

const getBotGuild = async (guildId: string) => {
  return await fetch(`https://discord.com/api/guilds/${guildId}`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`, // Bot token
    },
  }).then(res => res.json() as Promise<APIGuild>)
}

const checkGuildAccess = async ({
  guild: discordGuild,
  userId,
  prisma,
}: {
  guild: APIGuild
  userId: string
  prisma: PrismaClient
}) => {
  const userAccount = await getUserAccount(userId, prisma, {
    providerAccountId: true,
  })

  if (discordGuild.owner_id === userAccount?.providerAccountId) {
    return true
  } else {
    throw new Error('You do not have permission to manage this guild.')
  }
}
