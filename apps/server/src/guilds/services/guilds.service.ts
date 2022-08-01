import { Inject, Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { IGuildsHttpService, IGuildsService } from 'guilds/interfaces/guilds'

import {
  Guild,
  GuildPlugins,
  GuildSettings,
  GuildPluginsWhereUniqueInput,
  GuildSettingsWhereUniqueInput,
  GuildWhereUniqueInput,
  UpdateOneGuildArgs,
} from '../../@generated'
import { PRISMA_SERVICE } from '../../common'
import { DiscordGuild } from '../models/guild'
import { MutualGuild } from '../models/mutualGuilds'

@Injectable()
export class GuildsService implements IGuildsService {
  constructor(
    @Inject('GUILDS_HTTP_SERVICE')
    private readonly guildsHttpService: IGuildsHttpService,
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
  ) {}

  async getGuild(query: GuildWhereUniqueInput): Promise<Guild | null> {
    return await this.prisma.guild.findUnique({
      where: query,
    })
  }

  async updateGuild(args: UpdateOneGuildArgs): Promise<Guild> {
    return await this.prisma.guild.update(args)
  }

  async getGuildPlugins(
    query: GuildPluginsWhereUniqueInput,
  ): Promise<GuildPlugins | null> {
    return await this.prisma.guildPlugins.findUnique({
      where: query,
    })
  }

  async getGuildSettings(
    query: GuildSettingsWhereUniqueInput,
  ): Promise<GuildSettings | null> {
    return await this.prisma.guildSettings.findUnique({
      where: query,
    })
  }

  async getMutualGuilds(accessToken: string) {
    const { data: userGuilds } = await this.guildsHttpService.fetchUserGuilds(
      accessToken,
    )

    const { data: botGuilds } = await this.guildsHttpService.fetchBotGuilds()

    const adminUserGuilds: DiscordGuild[] = userGuilds.filter(
      ({ permissions }) => (parseInt(permissions ?? '0') & 0x8) === 0x8,
    )

    adminUserGuilds.filter(guild =>
      botGuilds.some(botGuild =>
        botGuild.id === guild.id ? (guild.bot = true) : (guild.bot = false),
      ),
    )

    return adminUserGuilds as MutualGuild[]
  }
}
