import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { GuildConfigService } from 'src/bot/services/guild-config/guild-config.service'
import { Guilds } from 'src/schemas'

import { GuildConfigResolver } from './guild-config.resolver'

describe('GuildConfigResolver', () => {
  let resolver: GuildConfigResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuildConfigResolver,
        { provide: 'GUILD_CONFIG_SERVICE', useClass: GuildConfigService },
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
