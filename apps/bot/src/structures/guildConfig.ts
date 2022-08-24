import { Guild, GuildPlugins, GuildSettings } from '@prisma/client'
import NodeCache from 'node-cache'

import { prisma } from '../index'

export type CachedGuild =
  | (Guild & {
      guildPlugins: GuildPlugins | null
      guildSettings: GuildSettings | null
    })
  | null

export interface FetchOptions {
  force: boolean
}

export class CacheManager extends NodeCache {
  constructor(options?: NodeCache.Options) {
    super(options)
  }
}

const DefaultFetchOptions: FetchOptions = {
  force: false,
}

export class GuildManager {
  public cache: NodeCache

  constructor() {
    this.cache = new NodeCache({
      stdTTL: 60 * 60, // 1 hour
    })
  }

  public async get(
    guildId: string,
    fetchOptions: FetchOptions = DefaultFetchOptions,
  ): Promise<CachedGuild> {
    const isCached = this.cache.has(guildId)

    if (!fetchOptions.force && isCached) {
      return this.cache.get(guildId) as CachedGuild
    }

    const fetchedGuild = await prisma.guild.findUnique({
      where: { id: guildId },
      include: {
        guildPlugins: true,
        guildSettings: true,
      },
    })
    this.set(guildId, fetchedGuild)
    return fetchedGuild
  }

  public set(guildId: string, guild: CachedGuild) {
    if (!guild) return
    this.cache.set(guildId, guild)
  }
}
