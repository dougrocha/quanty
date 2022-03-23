import { On, Event, logger, Logger } from '@quanty/framework'
import { GuildBan } from 'discord.js'

@On('guildBanAdd')
export class GuildMemberAddEvent extends Event<'guildBanAdd'> {
  @logger()
  private logger!: Logger

  async run(ban: GuildBan) {
    const { guild, user, reason } = ban
  }
}
