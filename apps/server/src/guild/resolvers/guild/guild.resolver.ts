import { Inject, UseGuards } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Observable } from 'rxjs'
import { GraphQLAuthGuard } from 'src/auth/utils/Guards'
import { Guild } from 'src/guild/models/guild'
import { IGuildsProvider } from 'src/guild/types'
import { AxiosResponse } from 'axios'
import { Channel } from 'src/guild/models/channel'

@Resolver(() => Guild)
@UseGuards(GraphQLAuthGuard)
export class GuildResolver {
  constructor(
    @Inject('GUILDS_SERVICE')
    private readonly GuildsService: IGuildsProvider,
  ) {}

  @Query(() => Guild, { name: 'guilds', nullable: false })
  async guilds(
    @Args('guildId', { type: () => String }) guildId: string,
  ): Promise<Observable<AxiosResponse<Guild[]>>> {
    return this.GuildsService.fetchGuild(guildId)
  }

  @ResolveField(() => [Channel])
  async channels(@Parent() guild: Guild) {
    const { id } = guild
    return this.GuildsService.fetchGuildChannels(id)
  }
}
