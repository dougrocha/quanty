import { Test, TestingModule } from '@nestjs/testing'

import { GuildConfigSubscriptionsResolver } from '../resolvers/guild-config-subscriptions.resolver'

describe('GuildConfigSubscriptionsResolver', () => {
  let resolver: GuildConfigSubscriptionsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildConfigSubscriptionsResolver],
    }).compile()

    resolver = module.get<GuildConfigSubscriptionsResolver>(
      GuildConfigSubscriptionsResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
