import { Inject } from '@nestjs/common'
import { Args, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import { Guild } from '../../@generated'
import { GUILD_EVENT, PUB_SUB } from '../../common'

@Resolver(() => Guild)
export class GuildConfigSubscriptionsResolver {
  constructor(@Inject(PUB_SUB) private readonly pubSub: PubSub) {}

  @Subscription(() => Guild, {
    filter: (payload, variables) =>
      payload.updatedGuildConfig.id === variables.id,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updatedGuildConfig(@Args('id') _id: string) {
    return this.pubSub.asyncIterator<Guild>(GUILD_EVENT.UPDATE_GUILD)
  }
}
