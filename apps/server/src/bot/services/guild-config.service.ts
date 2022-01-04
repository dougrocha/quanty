import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as Args from 'src/bot/dto/args'
import * as Inputs from 'src/bot/dto/input'
import { IGuildConfigProvider } from 'src/bot/interfaces/types'

import { GuildDocument, Guilds } from '../../schemas'

@Injectable()
export class GuildConfigService implements IGuildConfigProvider {
  constructor(
    @InjectModel(Guilds.name) private guildModel: Model<GuildDocument>,
  ) {}

  async getGuild({ guildId }: Args.GetGuildIdArgs) {
    return this.guildModel.findOne({ guildId }, { _id: 0, __v: 0 })
  }

  async updatePrefix({ guildId, prefix }: Inputs.UpdatePrefixInput) {
    return this.guildModel.findOneAndUpdate(
      { guildId },
      { prefix },
      { new: true, upsert: true },
    )
  }

  async updateModerationPlugin({
    guildId,
    plugin,
  }: Inputs.UpdateModerationPlugin) {
    return this.guildModel.findOneAndUpdate(
      { guildId },
      {
        moderation: {
          plugin,
        },
      },
      { upsert: true, new: true },
    )
  }

  async updateAutoMod({ guildId, autoMod }: Inputs.UpdateAutoModInput) {
    return this.guildModel.findOneAndUpdate(
      { guildId },
      {
        moderation: {
          autoMod,
        },
      },
      { upsert: true, new: true },
    )
  }

  async updateMusicPlugin({ guildId, plugin }: Inputs.UpdateMusicPlugin) {
    return this.guildModel.findOneAndUpdate(
      { guildId },
      {
        music: {
          plugin,
        },
      },
      { upsert: true, new: true },
    )
  }

  async updateMusicImmortality({
    guildId,
    immortal,
  }: Inputs.UpdateMusicImmortality) {
    return this.guildModel.findOneAndUpdate(
      { guildId },
      {
        music: {
          immortal,
        },
      },
      { upsert: true, new: true },
    )
  }

  async updateMusicChannel({ guildId, channel }: Inputs.UpdateMusicChannel) {
    return this.guildModel.findOneAndUpdate(
      { guildId },
      {
        music: {
          channel,
        },
      },
      { upsert: true, new: true },
    )
  }

  async updateBlacklistedWords({
    guildId,
    blacklistedWords,
  }: Inputs.UpdateBlacklistedWords) {
    return this.guildModel.findOneAndUpdate(
      { guildId },
      { blacklistedWords },
      { upsert: true, new: true },
    )
  }

  async updateAnimeNSFW({ guildId, nsfw }: Inputs.UpdateAnimeNsfw) {
    return this.guildModel.findOneAndUpdate(
      { guildId },
      {
        anime: {
          nsfw,
        },
      },
      { upsert: true, new: true },
    )
  }

  async updateAnimePlugin({ guildId, plugin }: Inputs.UpdateAnimePlugin) {
    return this.guildModel.findOneAndUpdate(
      { guildId },
      {
        anime: {
          plugin,
        },
      },
      { upsert: true, new: true },
    )
  }

  async addCustomCommand({ guildId, customCommand }: Inputs.AddCustomCommand) {
    const { description, id, name } = customCommand
    return this.guildModel.findOneAndUpdate(
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
  }

  async addNewLog({ guildId, log }: Inputs.AddLog) {
    const { action, name } = log
    return this.guildModel.findOneAndUpdate(
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
  }
}
