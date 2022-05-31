import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Guilds } from '@quanty/schemas'
import { Document, Model, ObjectId } from 'mongoose'
import { guildStub } from 'src/common/stubs/guild.stub'

import { GuildConfigService } from '../../guilds/services/guild-config.service'

type GuildDocumentAndId = Document & Guilds & { _id: ObjectId }

describe('GuildConfigService', () => {
  let service: GuildConfigService
  let guildModel: Model<Guilds>
  let guild: Guilds
  const { guildId } = guildStub()

  beforeEach(async () => {
    guild = new Guilds()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuildConfigService,
        {
          provide: getModelToken(Guilds.name),
          useValue: Model,
        },
      ],
    }).compile()

    service = module.get<GuildConfigService>(GuildConfigService)
    guildModel = module.get<Model<Guilds>>(getModelToken(Guilds.name))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getGuild', () => {
    it('should get guild with matching id', async () => {
      const spy = jest
        .spyOn(guildModel, 'findOne')
        .mockResolvedValue(guild as GuildDocumentAndId)
      await service.getGuild({ guildId })

      expect(spy).toHaveBeenCalledWith({ guildId }, { __v: 0, _id: 0 })
    })
  })

  // Describe('mutations', () => {
  //   let spy: jest.SpyInstance

  //   beforeEach(() => {
  //     spy = jest
  //       .spyOn(guildModel, 'findOneAndUpdate')
  //       .mockResolvedValue(guild as GuildDocumentAndId)
  //   })

  //   it('should update prefix', async () => {
  //     const { prefix } = guildStub()

  //     await service.updatePrefix({ guildId, prefix })
  //     expect(spy).toBeCalledWith(
  //       { guildId },
  //       { prefix },
  //       { new: true, upsert: true },
  //     )
  //   })
  // })
})
