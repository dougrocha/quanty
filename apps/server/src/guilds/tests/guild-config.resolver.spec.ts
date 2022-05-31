import { CacheModule } from '@nestjs/common'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Guilds } from '@quanty/schemas'
import { GuildConfigService } from 'src/guilds/services/guild-config.service'

import { GuildConfigResolver } from '../../guilds/resolvers/guild-config.resolver'
import { GuildServiceGateway } from '../../guilds/websocket/guild-service.gateway'

describe('GuildConfigResolver', () => {
  let resolver: GuildConfigResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({ isGlobal: true, ttl: 5 })],
      providers: [
        GuildConfigResolver,
        { provide: 'GUILD_CONFIG_SERVICE', useClass: GuildConfigService },
        GuildServiceGateway,
        {
          provide: getModelToken(Guilds.name),
          useClass: Mock,
        },
      ],
    }).compile()

    resolver = module.get<GuildConfigResolver>(GuildConfigResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

class Mock {
  public async save(): Promise<string> {
    return 'name'
  }
}
