import {
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  UseGuards,
} from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AxiosResponse } from 'axios'
import { Cache } from 'cache-manager'
import { Observable } from 'rxjs'

import { User } from '../../@generated'
import {
  GraphQLAuthGuard,
  GqlThrottlerGuard,
  GqlUser,
  DiscordRoles,
  Channel,
  DiscordGuild,
  GuildMember,
  MutualGuild,
} from '../../common'
import { IGuildsHttpService, IGuildsService } from '../interfaces/guilds'

@Resolver(() => DiscordGuild)
export class GuildsResolver {
  constructor(
    @Inject('GUILDS_SERVICE')
    private readonly GuildsService: IGuildsService,
    @Inject('GUILDS_HTTP_SERVICE')
    private readonly Guilds_Http_Service: IGuildsHttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(GraphQLAuthGuard, GqlThrottlerGuard)
  @Query(() => DiscordGuild, { name: 'guilds', nullable: false })
  async guilds(
    @Args('guildId', { type: () => String }) guildId: string,
  ): Promise<Observable<AxiosResponse<DiscordGuild>>> {
    return this.Guilds_Http_Service.fetchGuild(guildId)
  }

  @ResolveField(() => [Channel])
  async channels(
    @Parent() { id }: DiscordGuild,
  ): Promise<Observable<AxiosResponse<Channel[]>>> {
    return this.Guilds_Http_Service.fetchGuildChannels(id)
  }

  @ResolveField(() => [GuildMember])
  async members(
    @Parent() { id }: DiscordGuild,
  ): Promise<Observable<AxiosResponse<GuildMember[]>>> {
    return this.Guilds_Http_Service.fetchGuildMembers(id)
  }

  @ResolveField(() => [DiscordRoles])
  async roles(
    @Parent() { id }: DiscordGuild,
  ): Promise<Observable<AxiosResponse<DiscordRoles[]>>> {
    return this.Guilds_Http_Service.fetchGuildRoles(id)
  }

  @UseGuards(GraphQLAuthGuard)
  @Query(() => [MutualGuild], {
    description: 'Gets the available guilds that the user can edit.',
  })
  async mutualGuilds(@GqlUser() user: User): Promise<MutualGuild[]> {
    const { accessToken } = user

    // Access Token will exist at this point
    if (!accessToken)
      throw new ForbiddenException(
        {
          message: 'User is not authenticated',
          code: 401,
        },
        'Unauthenticated',
      )

    const cachedGuilds = await this.cacheManager.get(`mutualGuilds-${user.id}`)

    if (cachedGuilds) return <MutualGuild[]>cachedGuilds

    const mutualGuilds = await this.GuildsService.getMutualGuilds(accessToken)
    await this.cacheManager.set(`mutualGuilds-${user.id}`, mutualGuilds, {
      ttl: 30, // 30 seconds
    })

    return mutualGuilds
  }
}
