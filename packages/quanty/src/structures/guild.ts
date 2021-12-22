import QuantyClient from '../client';

import { Guild } from '../database/schemas';

class GuildManager {
  private client: QuantyClient;

  constructor(client: QuantyClient) {
    this.client = client;
  }

  async findAll() {
    return await Guild.find({}).lean();
  }

  /**
   * Get guild object with guild id
   * @param guildId Guild Id
   * @returns Guild Object stripped of functions
   */
  async findById(guildId: string) {
    return await Guild.findOne({ guildId }).lean();
  }

  async getPrefixandUpdate(guildId: string, prefix: string) {
    const guild = await this.findById(guildId);
    const oldPrefix = guild?.prefix;

    await Guild.findOneAndUpdate({ guildId }, { prefix })
      .then(() => {
        return {
          oldPrefix,
          prefix,
        };
      })
      .catch((e: any) => {
        return e;
      });
  }

  /**
   * Gets prefix with guild id
   * @param guildId Guild Id
   * @returns Guild prefix or `q!` if prefix doesnt exist
   */
  async getPrefix(guildId: string) {
    const guild = await this.findById(guildId);

    const prefix = guild?.prefix;

    if (prefix) {
      return prefix;
    } else {
      return `q!`;
    }
  }
}
export default GuildManager;
