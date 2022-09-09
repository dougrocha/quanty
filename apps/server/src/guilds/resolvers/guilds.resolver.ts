import { Inject, UseGuards } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

import { Users } from '../../@generated'
import {
  GraphQLAuthGuard,
  GqlThrottlerGuard,
  GqlUser,
  DiscordRoles,
  Channel,
  DiscordGuild,
  GuildMember,
  MutualGuild,
  GUILDS_SERVICE,
  GUILDS_HTTP_SERVICE,
} from '../../common'
import { IGuildsHttpService, IGuildsService } from '../interfaces/guilds'

@Resolver(() => DiscordGuild)
export class GuildsResolver {
  constructor(
    @Inject(GUILDS_SERVICE)
    private readonly GuildsService: IGuildsService,
    @Inject(GUILDS_HTTP_SERVICE)
    private readonly Guilds_Http_Service: IGuildsHttpService,
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
  async mutualGuilds(@GqlUser() user: Users): Promise<MutualGuild[]> {
    return await this.GuildsService.getMutualGuilds(user)
  }
}
