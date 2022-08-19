import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { IGuildsHttpService, IGuildsService } from 'guilds/interfaces/guilds'

import {
  Guild,
  GuildPlugins,
  GuildSettings,
  GuildPluginsWhereUniqueInput,
  GuildSettingsWhereUniqueInput,
  GuildWhereUniqueInput,
  UpdateOneGuildArgs,
  UpdateOneGuildPluginsArgs,
} from '../../@generated'
import {
  PRISMA_SERVICE,
  DiscordGuild,
  MutualGuild,
  GUILDS_HTTP_SERVICE,
} from '../../common'

@Injectable()
export class GuildsService implements IGuildsService {
  constructor(
    @Inject(GUILDS_HTTP_SERVICE)
    private readonly guildsHttpService: IGuildsHttpService,
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
  ) {}

  async getGuild(query: GuildWhereUniqueInput): Promise<Guild | null> {
    const guild = await this.prisma.guild.findUnique({
      where: query,
    })

    if (!query.id) return null

    if (!guild)
      return await this.prisma.guild.create({
        data: {
          id: query.id,
        },
      })

    return guild
  }

  async updateGuild(args: UpdateOneGuildArgs): Promise<Guild> {
    return await this.prisma.guild.update(args)
  }

  async updateGuildPlugins(
    args: UpdateOneGuildPluginsArgs,
  ): Promise<GuildPlugins> {
    return await this.prisma.guildPlugins.update(args)
  }

  async getGuildPlugins(
    query: GuildPluginsWhereUniqueInput,
  ): Promise<GuildPlugins | null> {
    if (!query?.id) return null

    let guildPlugins: GuildPlugins | null

    guildPlugins = await this.prisma.guildPlugins.findUnique({
      where: query,
    })

    if (!guildPlugins)
      guildPlugins = await this.prisma.guildPlugins.create({
        data: {
          id: query.id,
        },
      })

    return guildPlugins
  }

  async getGuildSettings(
    query: GuildSettingsWhereUniqueInput,
  ): Promise<GuildSettings | null> {
    if (!query?.id) return null

    let guildSettings: GuildSettings | null

    guildSettings = await this.prisma.guildSettings.findUnique({
      where: query,
    })

    if (!guildSettings)
      guildSettings = await this.prisma.guildSettings.create({
        data: {
          id: query.id,
        },
      })

    return guildSettings
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
