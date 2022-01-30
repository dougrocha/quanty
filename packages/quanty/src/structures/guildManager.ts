import { Collection } from 'discord.js'
import { guildsDocument } from 'types/mongoose.gen'
import { IGuildManager } from 'types/structures'

import QuantyClient from '../client'
import { Guild } from '../database/schemas'

class GuildManager implements IGuildManager {
  private client: QuantyClient

  readonly guilds: Collection<string, guildsDocument> = new Collection<
    string,
    guildsDocument
  >()

  constructor(client: QuantyClient) {
    this.client = client

    this.client.once('ready', async () => {
      await this.init()
    })
  }

  private async init() {
    const allGuilds = this.client.guilds.cache.map(guild => guild)

    allGuilds.map(async ({ id }) => {
      let guild: guildsDocument

      guild = await Guild.findOne({ guildId: id }).lean()

      if (!guild) {
        guild = await Guild.create({ guildId: id })
      }

      this.guilds.set(id, guild)
    })
  }

  updateGuildById(
    guildId: string,
    newGuild: guildsDocument,
  ): guildsDocument | undefined {
    this.guilds.set(guildId, newGuild)

    return this.findGuild(guildId)
  }

  getGuilds(): guildsDocument[] {
    return this.guilds.toJSON()
  }

  /**
   * Get guild object with guild id
   * @param guildId Guild Id
   * @returns Guild Object stripped of functions
   */
  findGuild(guildId: string): guildsDocument | undefined {
    return this.guilds.get(guildId)
  }

  async getPrefixAndUpdate(
    guildId: string,
    prefix: string,
  ): Promise<guildsDocument | undefined> {
    const guild = await this.findGuild(guildId)

    if (!guild) await Guild.create({ guildId })

    return await Guild.findOneAndUpdate(
      { guildId },
      { prefix },
      { upsert: true, new: true },
    )
  }

  /**
   * Gets prefix with guild id
   * @param guildId Guild Id
   * @returns Guild prefix or `q!` if prefix doesnt exist
   */
  getPrefix(guildId: string): string {
    const guild = this.findGuild(guildId)

    const prefix = guild?.prefix

    if (prefix) {
      return prefix
    }
    return `q!`
  }
}
export default GuildManager
