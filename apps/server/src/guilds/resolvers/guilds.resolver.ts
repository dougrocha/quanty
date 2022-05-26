import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  UseGuards,
} from '@nestjs/common'
import {
  Args,
  GqlExecutionContext,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { GraphQLAuthGuard } from 'src/auth/utils/Guards'
import {
  IGuildsHttpService,
  IGuildsService,
} from 'src/guilds/interfaces/guilds'
import { Channel } from 'src/guilds/models/channel'
import { Guild } from 'src/guilds/models/guild'

import { User as UserSchema } from '../../schemas'
import { GqlThrottlerGuard } from '../../utils/guards'

const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req.user
  },
)

@Resolver(() => Guild)
@UseGuards(GraphQLAuthGuard, GqlThrottlerGuard)
export class GuildsResolver {
  constructor(
    @Inject('GUILDS_SERVICE')
    private readonly GuildsService: IGuildsService,
    @Inject('GUILDS_HTTP_SERVICE')
    private readonly Guilds_Http_Service: IGuildsHttpService,
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

  @Query(() => [Guild])
  async mutualGuilds(@CurrentUser() user: UserSchema): Promise<Guild[]> {
    const { accessToken } = user
    return this.GuildsService.getMutualGuilds(accessToken)
  }
}
