import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Guilds } from '@quanty/schemas'

import { GuildConfigService } from '../services/guild-config.service'
import { GuildServiceGateway } from '../websocket/guild-service.gateway'

describe('GuildServiceGateway', () => {
  let gateway: GuildServiceGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuildServiceGateway,
        { provide: 'GUILD_CONFIG_SERVICE', useClass: GuildConfigService },
        {
          provide: getModelToken(Guilds.name),
          useClass: Mock,
        },
      ],
    }).compile()

    gateway = module.get<GuildServiceGateway>(GuildServiceGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})

class Mock {
  public async save(): Promise<string> {
    return 'name'
  }
}
