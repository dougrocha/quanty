import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Document, Model, ObjectId } from 'mongoose'
import { mockGuildDto } from 'src/common/stubs/mockGuildDto'
import { Guilds } from 'src/schemas'

import { GuildConfigService } from './guild-config.service'

type GuildDocumentAndId = Document & Guilds & { _id: ObjectId }

describe('GuildConfigService', () => {
  let service: GuildConfigService
  let mockGuildModel: Model<Guilds>
  let guild: Guilds
  const guildId = mockGuildDto.guildId

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
    mockGuildModel = module.get<Model<Guilds>>(getModelToken(Guilds.name))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should get guild with matching id', async () => {
    const spy = jest
      .spyOn(mockGuildModel, 'findOne')
      .mockResolvedValue(guild as GuildDocumentAndId)
    await service.getGuild({ guildId })
    expect(spy).toBeCalled()
  })

  it('should update prefix', async () => {
    const prefix = mockGuildDto.prefix
    const spy = jest
      .spyOn(mockGuildModel, 'findOneAndUpdate')
      .mockResolvedValue(guild as GuildDocumentAndId)
    await service.updatePrefix({ guildId, prefix })
    expect(spy).toBeCalled()
  })

  it('should update autoMod', async () => {
    const isAutoMod = mockGuildDto.moderation.autoMod as boolean
    const spy = jest
      .spyOn(mockGuildModel, 'findOneAndUpdate')
      .mockResolvedValue(guild as GuildDocumentAndId)
    await service.updateAutoMod({ guildId, autoMod: isAutoMod })
    expect(spy).toBeCalled()
  })

  it('should add a new custom command', async () => {
    const customCommands = mockGuildDto.customCommands
    const customCommand = customCommands[0]
    const spy = jest
      .spyOn(mockGuildModel, 'findOneAndUpdate')
      .mockResolvedValue(guild as GuildDocumentAndId)
    await service.addCustomCommand({ guildId, customCommand })
    expect(spy).toBeCalled()
  })

  it('should add a new log', async () => {
    const logs = mockGuildDto.logs
    const log = logs[0]
    const spy = jest
      .spyOn(mockGuildModel, 'findOneAndUpdate')
      .mockResolvedValue(guild as GuildDocumentAndId)
    await service.addNewLog({ guildId, log })
    expect(spy).toBeCalled()
  })
})
