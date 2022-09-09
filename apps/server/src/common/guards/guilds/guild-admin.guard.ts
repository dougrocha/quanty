import {
  CACHE_MANAGER,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Cache } from 'cache-manager'

import { Users } from '../../../@generated'
import { IGuildsService } from '../../../guilds/interfaces/guilds'
import { GUILDS_SERVICE } from '../../constants'
import { MutualGuild } from '../../models'

export class GuildAdminGuard implements CanActivate {
  constructor(
    @Inject(GUILDS_SERVICE) private readonly guildsService: IGuildsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const user = ctx.getContext().req.user as Users
    const guildId = ctx.getArgs().guildId

    if (!user.accessToken) {
      return false
    }

    let cachedMutualGuilds = await this.cacheManager.get<MutualGuild[]>(
      `mutualGuilds-${user.id}`,
    )

    if (cachedMutualGuilds)
      return this.checkGuildPermissions(guildId, cachedMutualGuilds)
    else {
      cachedMutualGuilds = await this.guildsService.getMutualGuilds(user)
      await this.cacheManager.set(`mutualGuilds-${user.id}`, cachedMutualGuilds)
      return this.checkGuildPermissions(guildId, cachedMutualGuilds)
    }
  }

  checkGuildPermissions(guildId: string, mutualGuilds: MutualGuild[]): boolean {
    return mutualGuilds.find((guild: MutualGuild) => guild.id === guildId)
      ? true
      : false
  }
}
