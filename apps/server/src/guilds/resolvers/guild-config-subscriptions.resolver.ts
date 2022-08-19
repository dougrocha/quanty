import {
  CanActivate,
  ExecutionContext,
  Inject,
  UseGuards,
} from '@nestjs/common'
import {
  Args,
  GqlExecutionContext,
  Resolver,
  Subscription,
} from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import { Guild } from '../../@generated'
import { GUILD_EVENT, PUB_SUB } from '../../common'

export class TestGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('1', context)

    return true
  }
}

@Resolver(() => Guild)
@UseGuards(TestGuard)
export class GuildConfigSubscriptionsResolver {
  constructor(@Inject(PUB_SUB) private readonly pubSub: PubSub) {}

  @Subscription(() => Guild, {
    filter: (payload, variables) => {
      return payload.updatedGuildConfig.id === variables.id
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updatedGuildConfig(@Args('id') _id: string) {
    return this.pubSub.asyncIterator<Guild>(GUILD_EVENT.UPDATE_GUILD)
  }
}
