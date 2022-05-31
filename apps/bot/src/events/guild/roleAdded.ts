import { Event, logger, Logger, On } from '@quanty/framework'
import { Role } from 'discord.js'

import { GuildsModel } from '../../database'

@On('roleCreate')
export class GuildMemberAddEvent extends Event<'roleCreate'> {
  @logger()
  private logger!: Logger

  run(role: Role): void {
    const { members, guild } = role

    // Const guildConfig = await this.fetchGuildConfig(guild.id)

    // const webHookChannelId = guildConfig?.logChannel

    // if (!webHookChannelId) return

    // const channel = await this.client.channels.fetch(webHookChannelId)

    // // Channel must be guild channel
    // if (!(channel instanceof TextChannel)) return

    // const webhooks = await channel.fetchWebhooks()

    // const channelHook = webhooks.find(wh => wh.channelId == channel.id)

    // await channelHook?.send(`New ${user.username} joined ${guild.name}`)

    // // Default Role must exist
    // if (!guildConfig?.defaultJoinRole) return

    // await member.roles.add(guildConfig.defaultJoinRole)
  }

  async fetchGuildConfig(guildId: string) {
    const guild = await GuildsModel.findOne({ guildId })

    if (!guild) {
      return null
    }

    return guild
  }
}
