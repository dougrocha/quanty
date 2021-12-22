import QuantyClient from '../client';
import QuantyLogger from './logger';

import { GuildResponseType, GuildSettingsType, IPluginManager } from '../types';

import { Guild } from '../database/schemas';
import {
  guildsModel,
  guildsDocument,
  guildsCustomCommand,
  guildsLog,
} from '../types/mongoose.gen';

class PluginManager implements IPluginManager {
  private logger: QuantyLogger = new QuantyLogger('PluginManager');

  private client: QuantyClient;

  private guildModel: guildsModel;

  /**
   * PluginManager for Guild Settings
   * @param client
   */
  constructor(client: QuantyClient) {
    this.client = client;

    /**
     * Guild Schema
     */
    this.guildModel = Guild;
  }

  async createGuild(guildId: string) {
    return this.guildModel.create({ guildId });
  }

  public async createAllGuilds() {
    const allGuilds = (await this.client.guilds.fetch()).toJSON();
    allGuilds.map(({ id }) => {
      this.getGuild(id);
      this.createGuild(id);
    });

    const guildsObject: guildsDocument[] = await Guild.find();

    return guildsObject;
  }

  public async getGuild(guildId: string): Promise<guildsDocument> {
    return await this.guildModel.findOne({ guildId }).lean();
  }

  public async getGuildSetting<B extends GuildSettingsType>({
    guildId,
    setting,
  }: {
    guildId: string;
    setting: B;
  }): Promise<GuildResponseType<B>>;

  /**
   *  Fetches Guild Setting with specified setting
   * @param {GuildSetting} ID_Setting
   * @returns Guild Setting Object
   */

  public async getGuildSetting({
    guildId,
    setting,
  }: {
    guildId: string;
    setting: GuildSettingsType;
  }): Promise<any> {
    const guildConfig = (await this.getGuild(guildId)) as guildsDocument;

    switch (setting) {
      case 'MUSIC':
        const { music } = guildConfig;
        return music;

      case 'ANIME':
        const { anime } = guildConfig;
        return anime;

      case 'MODERATION':
        const { moderation } = guildConfig;
        return moderation;

      case 'CUSTOMCOMMAND':
        const { customCommands } = guildConfig;
        // Maps each command to remove the object id
        return customCommands.map((command) => {
          const { id, name, description } = command;
          return { id, name, description };
        });

      case 'BANNEDWORDS':
        const { blacklistedWords } = guildConfig;
        return blacklistedWords;

      case 'PREFIX':
        const { prefix } = guildConfig;
        return prefix;

      default:
        return null;
    }
  }

  async updatePrefix({ guildId, prefix }: { guildId: string; prefix: string }) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      { prefix },
      { new: true }
    );
  }

  async updateModerationPlugin({
    guildId,
    plugin,
  }: {
    guildId: string;
    plugin: boolean;
  }) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        moderation: {
          plugin: plugin,
        },
      },
      { new: true }
    );
  }

  async updateAutoMod({
    guildId,
    autoMod,
  }: {
    guildId: string;
    autoMod: boolean;
  }) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        moderation: {
          autoMod,
        },
      },
      { new: true }
    );
  }

  async updateMusicPlugin({
    guildId,
    plugin,
  }: {
    guildId: string;
    plugin: boolean;
  }) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        music: {
          plugin,
        },
      },
      { new: true }
    );
  }

  async updateMusicImmortality({
    guildId,
    immortal,
  }: {
    guildId: string;
    immortal: boolean;
  }) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        music: {
          immortal,
        },
      },
      { new: true }
    );
  }

  async updateMusicChannel({
    guildId,
    channel,
  }: {
    guildId: string;
    channel: string;
  }) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        music: {
          musicChannel: channel,
        },
      },
      { new: true }
    );
  }

  async updateBlacklistedWords({
    guildId,
    blacklistedWords,
  }: {
    guildId: string;
    blacklistedWords: string[];
  }) {
    const words = await this.getGuildSetting({
      guildId,
      setting: 'BANNEDWORDS',
    });

    const newSet = { ...blacklistedWords, ...words };

    return await this.guildModel.findOneAndUpdate(
      { guildId },
      { blacklistedWords: newSet },
      { new: true }
    );
  }

  async updateAnimeNSFW({ guildId, nsfw }: { guildId: string; nsfw: boolean }) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        anime: {
          nsfw,
        },
      },
      { new: true }
    );
  }
  async updateAnimePlugin({
    guildId,
    plugin,
  }: {
    guildId: string;
    plugin: boolean;
  }) {
    return await this.guildModel.findOneAndUpdate(
      { guildId },
      {
        anime: {
          plugin,
        },
      },
      { new: true }
    );
  }

  async addCustomCommand({
    guildId,
    customCommand,
  }: {
    guildId: string;
    customCommand: guildsCustomCommand;
  }) {
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
      { new: true }
    );
  }

  async addNewLog({ guildId, log }: { guildId: string; log: guildsLog }) {
    const { action, name, updatedAt } = log;
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
      { new: true }
    );
  }
}

export default PluginManager;
