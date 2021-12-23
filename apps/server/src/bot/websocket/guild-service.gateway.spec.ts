import { Test, TestingModule } from '@nestjs/testing'
import { GuildServiceGateway } from './guild-service.gateway'

describe('GuildServiceGateway', () => {
  let gateway: GuildServiceGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildServiceGateway],
    }).compile()

    gateway = module.get<GuildServiceGateway>(GuildServiceGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})
