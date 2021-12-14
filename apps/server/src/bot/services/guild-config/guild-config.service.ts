import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGuildConfigProvider } from 'src/bot/types';

import { GuildDocument, Guilds } from '../../../schemas';

import * as Args from 'src/bot/dto/args';
import * as Inputs from 'src/bot/dto/input';

@Injectable()
export class GuildConfigService implements IGuildConfigProvider {
  constructor(
    @InjectModel(Guilds.name) private guildModel: Model<GuildDocument>,
  ) {}

  async getGuild({ guildId }: Args.GetGuildIdArgs) {
    return await this.guildModel.findOne({ guildId }, { _id: 0, __v: 0 });
  }

  async updatePrefix({ guildId, prefix }: Inputs.UpdatePrefixInput) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      { prefix },
      { new: true },
    );
  }

  async updateModerationPlugin({
    guildId,
    plugin,
  }: Inputs.UpdateModerationPlugin) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        moderation: {
          plugin: plugin,
        },
      },
      { new: true },
    );
  }

  async updateAutoMod({ guildId, autoMod }: Inputs.UpdateAutoModInput) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        moderation: {
          autoMod: autoMod,
        },
      },
      { new: true },
    );
  }

  async updateMusicPlugin({ guildId, plugin }: Inputs.UpdateMusicPlugin) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        music: {
          plugin: plugin,
        },
      },
      { new: true },
    );
  }

  async updateMusicImmortality({
    guildId,
    immortal,
  }: Inputs.UpdateMusicImmortality) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        music: {
          immortal: immortal,
        },
      },
      { new: true },
    );
  }

  async updateMusicChannel({ guildId, channel }: Inputs.UpdateMusicChannel) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        music: {
          channel,
        },
      },
      { new: true },
    );
  }

  async updateBlacklistedWords({
    guildId,
    blacklistedWords,
  }: Inputs.UpdateBlacklistedWords) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      { blacklistedWords },
      { new: true },
    );
  }

  async updateAnimeNSFW({ guildId, nsfw }: Inputs.UpdateAnimeNsfw) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        anime: {
          nsfw: nsfw,
        },
      },
      { new: true },
    );
  }
  async updateAnimePlugin({ guildId, plugin }: Inputs.UpdateAnimePlugin) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        anime: {
          plugin: plugin,
        },
      },
      { new: true },
    );
  }

  async addCustomCommand({ guildId, customCommand }: Inputs.AddCustomCommand) {
    const { description, id, name } = customCommand;
    return await this.guildModel.findOneAndUpdate(
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
      { new: true },
    );
  }

  async addNewLog({ guildId, log }: Inputs.AddLog) {
    const { action, name } = log;
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        $push: {
          logs: {
            name,
            action,
          },
        },
      },
      { new: true },
    );
  }
}
