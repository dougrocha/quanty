import { Inject, UseGuards } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Observable } from 'rxjs'
import { GraphQLAuthGuard } from 'src/auth/utils/Guards'
import { Guild } from 'src/guild/models/guild'
import { IGuildProvider } from 'src/guild/types'
import { AxiosResponse } from 'axios'
import { Channel } from 'src/guild/models/channel'

@Resolver(() => Guild)
@UseGuards(GraphQLAuthGuard)
export class GuildResolver {
  constructor(
    @Inject('GUILD_SERVICE')
    private readonly GuildService: IGuildProvider,
  ) {}

  @Query(() => Guild, { name: 'guilds', nullable: false })
  async guilds(
    @Args('guildId', { type: () => String }) guildId: string,
  ): Promise<Observable<AxiosResponse<Guild[]>>> {
    return this.GuildService.fetchGuild(guildId)
  }

  @ResolveField(() => [Channel])
  async channels(
    @Parent() guild: Guild,
  ): Promise<Observable<AxiosResponse<Channel[]>>> {
    const { id } = guild
    return this.GuildService.fetchGuildChannels(id)
  }
}
