import { Test, TestingModule } from '@nestjs/testing'

import { SubscriptionsResolver } from '../resolvers/subscriptions.resolver'

describe('SubscriptionsResolver', () => {
  let resolver: SubscriptionsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionsResolver],
    }).compile()

    resolver = module.get<SubscriptionsResolver>(SubscriptionsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
