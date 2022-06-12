import { CACHE_MANAGER, Inject, UseGuards } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Users } from '@quanty/schemas'
import { AxiosResponse } from 'axios'
import { Cache } from 'cache-manager'
import { Observable } from 'rxjs'
import {
  IGuildsHttpService,
  IGuildsService,
} from 'src/guilds/interfaces/guilds'
import { Channel } from 'src/guilds/models/channel'
import { Guild } from 'src/guilds/models/guild'

import { GraphQLAuthGuard, GqlThrottlerGuard, GqlUser } from '../../common'
import { MutualGuild } from '../models/mutualGuilds'

@Resolver(() => Guild)
@UseGuards(GraphQLAuthGuard, GqlThrottlerGuard)
export class GuildsResolver {
  constructor(
    @Inject('GUILDS_SERVICE')
    private readonly GuildsService: IGuildsService,
    @Inject('GUILDS_HTTP_SERVICE')
    private readonly Guilds_Http_Service: IGuildsHttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Query(() => Guild, { name: 'guilds', nullable: false })
  async guilds(
    @Args('guildId', { type: () => String }) guildId: string,
  ): Promise<Observable<AxiosResponse<Guild>>> {
    return this.Guilds_Http_Service.fetchGuild(guildId)
  }

  @ResolveField(() => [Channel])
  async channels(
    @Parent() guild: Guild,
  ): Promise<Observable<AxiosResponse<Channel[]>>> {
    const { id } = guild
    return this.Guilds_Http_Service.fetchGuildChannels(id)
  }

  @Query(() => [MutualGuild], {
    description: 'Gets the available guilds that the user can edit.',
  })
  async mutualGuilds(@GqlUser() user: Users): Promise<MutualGuild[]> {
    const { accessToken } = user
    const cachedGuilds = await this.cacheManager.get(
      `mutualGuilds-${user.discordId}`,
    )

    if (cachedGuilds) return <MutualGuild[]>cachedGuilds

    const mutualGuilds = await this.GuildsService.getMutualGuilds(accessToken)
    await this.cacheManager.set(`mutualGuilds-${user.discordId}`, mutualGuilds)

    return mutualGuilds
  }
}
