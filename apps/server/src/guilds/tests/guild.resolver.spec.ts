import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'

import { GuildsResolver } from '../resolvers/guilds.resolver'
import { GuildsHttpService } from '../services/guilds-http.service'

describe('GuildsResolver', () => {
  let resolver: GuildsResolver

  const mockGuild = {
    id: '123',
    owner: true,
    afk_timeout: 2,
    emojis: [],
    features: [],
    name: 'guild',
    nsfw_level: 0,
    owner_id: '123',
    preferred_locale: 'us',
    premium_tier: 0,
    roles: [],
    stickers: [],
    splash: 'splash',
    discovery_splash: '',
  }
  const mockChannel = { guild_id: '123', position: 2, icon: '123' }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        GuildsResolver,
        {
          provide: 'GUILDS_SERVICE',
          useFactory: () => ({
            fetchGuild: jest.fn().mockResolvedValue([mockGuild]),
            fetchGuildChannels: jest.fn().mockResolvedValue([mockChannel]),
          }),
        },
        { provide: 'GUILDS_HTTP_SERVICE', useClass: GuildsHttpService },
      ],
    }).compile()

    resolver = module.get<GuildsResolver>(GuildsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
