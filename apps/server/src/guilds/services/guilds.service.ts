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
  GuildPlugin,
  GuildPluginWhereUniqueInput,
  GuildWhereUniqueInput,
  UpdateOneGuildArgs,
  UpdateOneGuildPluginArgs,
  User,
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
    // const cachedGuild = await this.cacheManager.get<Guild>(
    //   `guildConfig-${query.id}`,
    // )

    // if (cachedGuild) return cachedGuild

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
    args: UpdateOneGuildPluginArgs,
  ): Promise<GuildPlugin> {
    const guild = await this.prisma.guildPlugin.update(args)
    // Await this.cacheManager.set(`guildPlugins-${args.where.id}`, guild, {
    //   ttl: 60 * 5, // 5 minutes
    // })
    return guild
  }

  async getGuildPlugins(
    query: GuildPluginWhereUniqueInput,
  ): Promise<GuildPlugin | null> {
    if (!query?.id) return null

    // const cachedGuildPlugins = await this.cacheManager.get(
    //   `guildPlugins-${query.id}`,
    // )

    // if (cachedGuildPlugins) return <GuildPlugins>cachedGuildPlugins

    let guildPlugins: GuildPlugin | null

    guildPlugins = await this.prisma.guildPlugin.findUnique({
      where: query,
    })

    if (!guildPlugins)
      guildPlugins = await this.prisma.guildPlugin.create({
        data: {
          id: query.id,
        },
      })

    // Await this.cacheManager.set(`guildPlugins-${query.id}`, guildPlugins, {
    //   ttl: 60 * 5, // 5 minutes
    // })

    return guildPlugins
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

    let userGuilds = await this.cacheManager.get<DiscordGuild[]>(
      `userGuilds:${user.id}`,
    )

    if (!userGuilds) {
      userGuilds = (
        await this.guildsHttpService.fetchUserGuilds(user.accessToken)
      ).data
      await this.cacheManager.set(`userGuilds:${user.id}`, userGuilds, {
        ttl: 30, // 30 seconds
      })
    }

    let botGuilds = await this.cacheManager.get<DiscordGuild[]>('botGuilds')

    if (!botGuilds) {
      botGuilds = (await this.guildsHttpService.fetchBotGuilds()).data
      await this.cacheManager.set('botGuilds', botGuilds, {
        ttl: 60 * 2, // 3 minutes
      })
    }

    // Find guilds with matching admin permissions
    const adminUserGuilds: DiscordGuild[] = userGuilds.filter(
      ({ permissions }) => (parseInt(permissions ?? '0') & 0x8) === 0x8,
    )

    adminUserGuilds.filter(guild =>
      botGuilds?.some(botGuild =>
        botGuild.id === guild.id ? (guild.bot = true) : (guild.bot = false),
      ),
    )

    return adminUserGuilds as MutualGuild[]
  }
}
