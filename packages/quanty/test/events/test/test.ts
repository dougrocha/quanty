import { GuildBan } from 'discord.js'
import { Once } from '../../../src'
import { Event } from '../../../src/structures/event/Event'

@Once('guildBanAdd')
export class TestEvent extends Event<'guildBanAdd'> {
  async run(ban: GuildBan) {
    this.logger?.log(`GuildBanAdd event: ${ban.user.id}`)
  }
}
