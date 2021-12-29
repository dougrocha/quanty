import { Test, TestingModule } from '@nestjs/testing'

import { GuildResolver } from './guild.resolver'

describe('GuildResolver', () => {
  let resolver: GuildResolver

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
  }
  const mockChannel = { guild_id: '123', position: 2, icon: '123' }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuildResolver,
        {
          provide: 'GUILD_SERVICE',
          useFactory: () => ({
            fetchGuild: jest.fn().mockResolvedValue([mockGuild]),
            fetchGuildChannels: jest.fn().mockResolvedValue([mockChannel]),
          }),
        },
      ],
    }).compile()

    resolver = module.get<GuildResolver>(GuildResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('query guilds', () => {
    it('should return an array of guilds', async () => {
      expect(await resolver.guilds('123')).toEqual([mockGuild])
    })

    it('should return an array of channels', async () => {
      expect(await resolver.channels(mockGuild)).toEqual([mockChannel])
    })
  })
})
