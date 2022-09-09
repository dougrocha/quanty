import { Inject } from '@nestjs/common'
import { Args, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import { Guilds } from '../../@generated'
import { GUILD_EVENT, PUB_SUB } from '../../common'

@Resolver(() => Guilds)
export class GuildConfigSubscriptionsResolver {
  constructor(@Inject(PUB_SUB) private readonly pubSub: PubSub) {}

  @Subscription(() => Guilds, {
    filter: (payload, variables) =>
      payload.updatedGuildConfig.id === variables.id,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updatedGuildConfig(@Args('id') _id: string) {
    return this.pubSub.asyncIterator<Guilds>(GUILD_EVENT.UPDATE_GUILD)
  }
}
