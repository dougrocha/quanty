import {
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { Cache } from 'cache-manager'
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
  User,
  UpdateOneGuildSettingsArgs,
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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getGuild(query: GuildWhereUniqueInput): Promise<Guild | null> {
    const cachedGuild = await this.cacheManager.get<Guild>(
      `guildConfig-${query.id}`,
    )

    if (cachedGuild) return cachedGuild

    if (!query.id) return null

    let guild = await this.prisma.guild.findUnique({
      where: query,
    })

    if (!guild)
      guild = await this.prisma.guild.create({
        data: {
          id: query.id,
        },
      })

    // Await this.cacheManager.set(`guildConfig-${query.id}`, guild, {
    //   ttl: 60 * 5, // 5 minutes
    // })

    return guild
  }

  async updateGuild(args: UpdateOneGuildArgs): Promise<Guild> {
    const guild = await this.prisma.guild.update(args)
    // Await this.cacheManager.set(`guildConfig-${args.where.id}`, guild, {
    //   ttl: 60 * 5, // 5 minutes
    // })
    return guild
  }

  async updateGuildPlugins(
    args: UpdateOneGuildPluginsArgs,
  ): Promise<GuildPlugins> {
    const guild = await this.prisma.guildPlugins.update(args)
    // Await this.cacheManager.set(`guildPlugins-${args.where.id}`, guild, {
    //   ttl: 60 * 5, // 5 minutes
    // })
    return guild
  }

  async updateGuildSettings(
    args: UpdateOneGuildSettingsArgs,
  ): Promise<GuildSettings> {
    const guild = await this.prisma.guildSettings.update(args)
    // Await this.cacheManager.set(`guildSettings-${args.where.id}`, guild, {
    //   ttl: 60 * 5, // 5 minutes
    // })
    return guild
  }

  async getGuildPlugins(
    query: GuildPluginsWhereUniqueInput,
  ): Promise<GuildPlugins | null> {
    if (!query?.id) return null

    const cachedGuildPlugins = await this.cacheManager.get(
      `guildPlugins-${query.id}`,
    )

    if (cachedGuildPlugins) return <GuildPlugins>cachedGuildPlugins

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

    // Await this.cacheManager.set(`guildPlugins-${query.id}`, guildPlugins, {
    //   ttl: 60 * 5, // 5 minutes
    // })

    return guildPlugins
  }

  async getGuildSettings(
    query: GuildSettingsWhereUniqueInput,
  ): Promise<GuildSettings | null> {
    if (!query?.id) return null

    const cachedGuildSettings = await this.cacheManager.get(
      `guildSettings-${query.id}`,
    )

    if (cachedGuildSettings) return <GuildSettings>cachedGuildSettings

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

    // Await this.cacheManager.set(`guildSettings-${query.id}`, guildSettings, {
    //   ttl: 60 * 5, // 5 minutes
    // })

    return guildSettings
  }

  async getMutualGuilds(user: User) {
    if (!user.accessToken)
      throw new ForbiddenException(
        {
          message: 'User is not authenticated',
          code: 401,
        },
        'Unauthenticated',
      )

    const cachedGuilds = await this.cacheManager.get<MutualGuild[]>(
      `mutualGuilds-${user.id}`,
    )

    if (cachedGuilds) return cachedGuilds

    const { data: userGuilds } = await this.guildsHttpService.fetchUserGuilds(
      user.accessToken,
    )

    let botGuilds = await this.cacheManager.get<DiscordGuild[]>(`bg:${user.id}`)

    if (!botGuilds) {
      botGuilds = (await this.guildsHttpService.fetchBotGuilds()).data
      await this.cacheManager.set(`bg:${user.id}`, botGuilds, {
        ttl: 60 * 2, // 2 minutes
      })
    }

    const adminUserGuilds: DiscordGuild[] = userGuilds.filter(
      ({ permissions }) => (parseInt(permissions ?? '0') & 0x8) === 0x8,
    )

    adminUserGuilds.filter(guild =>
      botGuilds?.some(botGuild =>
        botGuild.id === guild.id ? (guild.bot = true) : (guild.bot = false),
      ),
    )

    await this.cacheManager.set(`mutualGuilds-${user.id}`, adminUserGuilds, {
      ttl: 60 * 2, // 2 minutes
    })

    return adminUserGuilds as MutualGuild[]
  }
}
