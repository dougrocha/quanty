import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Document, Model, ObjectId } from 'mongoose'
import { guildStub } from 'src/common/stubs/guild.stub'
import { Guilds } from 'src/schemas'

import { GuildConfigService } from './guild-config.service'

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

  describe('mutations', () => {
    let spy: jest.SpyInstance

    beforeEach(() => {
      spy = jest
        .spyOn(guildModel, 'findOneAndUpdate')
        .mockResolvedValue(guild as GuildDocumentAndId)
    })

    it('should update prefix', async () => {
      const { prefix } = guildStub()

      await service.updatePrefix({ guildId, prefix })
      expect(spy).toBeCalledWith(
        { guildId },
        { prefix },
        { new: true, upsert: true },
      )
    })

    it('should update moderation automod', async () => {
      const isAutoMod = guildStub().moderation.autoMod as boolean

      await service.updateAutoMod({ guildId, autoMod: isAutoMod })
      expect(spy).toHaveBeenCalledWith(
        { guildId },
        {
          moderation: {
            autoMod: isAutoMod,
          },
        },
        { upsert: true, new: true },
      )
    })

    it('should update moderation plugin', async () => {
      const isPluginOn = guildStub().moderation.plugin as boolean

      await service.updateModerationPlugin({ guildId, plugin: isPluginOn })
      expect(spy).toBeCalledWith(
        { guildId },
        {
          moderation: {
            plugin: isPluginOn,
          },
        },
        { upsert: true, new: true },
      )
    })

    it('should update music plugin', async () => {
      const isPluginOn = guildStub().music.plugin as boolean

      await service.updateMusicPlugin({ guildId, plugin: isPluginOn })
      expect(spy).toBeCalledWith(
        { guildId },
        {
          music: {
            plugin: isPluginOn,
          },
        },
        { upsert: true, new: true },
      )
    })

    it('should update music immortality', async () => {
      const isImmortal = guildStub().music.immortal as boolean

      await service.updateMusicImmortality({ guildId, immortal: isImmortal })
      expect(spy).toBeCalledWith(
        { guildId },
        {
          music: {
            immortal: isImmortal,
          },
        },
        { upsert: true, new: true },
      )
    })

    it('should update music channel', async () => {
      const channel = guildStub().music.channel as string

      await service.updateMusicChannel({ guildId, channel })
      expect(spy).toBeCalledWith(
        { guildId },
        {
          music: {
            channel,
          },
        },
        { upsert: true, new: true },
      )
    })

    it('should update blacklisted words', async () => {
      const words = guildStub().blacklistedWords

      await service.updateBlacklistedWords({ guildId, blacklistedWords: words })
      expect(spy).toBeCalledWith(
        { guildId },
        {
          blacklistedWords: words,
        },
        { upsert: true, new: true },
      )
    })

    it('should update anime NSFW', async () => {
      const isNSFW = guildStub().anime.nsfw as boolean

      await service.updateAnimeNSFW({ guildId, nsfw: isNSFW })
      expect(spy).toBeCalledWith(
        { guildId },
        {
          anime: {
            nsfw: isNSFW,
          },
        },
        { upsert: true, new: true },
      )
    })
    it('should update anime plugin', async () => {
      const isPluginOn = guildStub().anime.plugin as boolean

      await service.updateAnimePlugin({ guildId, plugin: isPluginOn })
      expect(spy).toBeCalledWith(
        { guildId },
        {
          anime: {
            plugin: isPluginOn,
          },
        },
        { upsert: true, new: true },
      )
    })

    it('should add a new custom command', async () => {
      const { customCommands } = guildStub()
      const customCommand = customCommands[0]
      const { id, description, name } = customCommand

      await service.addCustomCommand({ guildId, customCommand })
      expect(spy).toHaveBeenCalledWith(
        { guildId },
        {
          $push: {
            customCommands: {
              id,
              name,
              description,
            },
          },
        },
        { upsert: true, new: true },
      )
    })

    it('should add a new log', async () => {
      const { logs } = guildStub()
      const log = logs[0]
      const { name, action } = log

      await service.addNewLog({ guildId, log })
      expect(spy).toHaveBeenCalledWith(
        { guildId },
        {
          $push: {
            logs: {
              name,
              action,
            },
          },
        },
        { upsert: true, new: true },
      )
    })
  })
})
