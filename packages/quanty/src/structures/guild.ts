import { Collection } from 'discord.js'
import { guildsDocument } from 'types/mongoose.gen'
import { IGuildManager } from 'types/structures'

import QuantyClient from '../client'
import { Guild } from '../database/schemas'

class GuildManager implements IGuildManager {
  private client: QuantyClient

  private guilds: Collection<string, guildsDocument> = new Collection<
    string,
    guildsDocument
  >()

  constructor(client: QuantyClient) {
    this.client = client
  }

  async init() {
    const allGuilds = this.client.guilds.cache.map(guild => guild)

    allGuilds.map(async ({ id }) => {
      let guild

      guild = await Guild.findOne({ guildId: id })

      if (!guild) {
        guild = await Guild.create({ guildId: id })
      }

      this.guilds.set(id, guild)
    })
  }

  getGuilds() {
    return this.guilds.map(guild => guild)
  }

  /**
   * Get guild object with guild id
   * @param guildId Guild Id
   * @returns Guild Object stripped of functions
   */
  async findById(guildId: string) {
    return this.guilds.get(guildId)
  }

  async updateGuildById(guildId: string, newGuild: guildsDocument) {
    this.guilds.set(guildId, newGuild)

    return this.findById(guildId)
  }

  async getPrefixAndUpdate(guildId: string, prefix: string) {
    const guild = await this.findById(guildId)
    const oldPrefix = guild?.prefix

    return await Guild.findOneAndUpdate({ guildId }, { prefix }).then(() => {
      return {
        oldPrefix,
        prefix,
      }
    })
  }

  /**
   * Gets prefix with guild id
   * @param guildId Guild Id
   * @returns Guild prefix or `q!` if prefix doesnt exist
   */
  async getPrefix(guildId: string) {
    const guild = await this.findById(guildId)

    const prefix = guild?.prefix

    if (prefix) {
      return prefix
    }
    return `q!`
  }
}
export default GuildManager
