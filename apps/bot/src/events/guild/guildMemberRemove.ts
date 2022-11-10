import { Event, On } from '@quanty/framework'
import { GuildMember, TextChannel } from 'discord.js'

@On('guildMemberRemove')
export class GuildMemberRemoveEvent extends Event<'guildMemberRemove'> {
  async run(member: GuildMember) {
    // Const { user, guild } = member
    // const guildConfig = await this.fetchGuildConfig(guild.id)
    // const webHookChannelId = guildConfig?.logChannel
    // if (!webHookChannelId) return
    // const channel = await this.client.channels.fetch(webHookChannelId)
    // // Channel must be guild channel
    // if (!(channel instanceof TextChannel)) return
    // const webhooks = await channel.fetchWebhooks()
    // const channelHook = webhooks.find(wh => wh.channelId == channel.id)
    // await channelHook?.send(
    //   `Member: ${user.username} has been removed from ${guild.name}`,
    // )
    // // Default Role must exist
    // if (!guildConfig?.defaultJoinRole) return
    // await member.roles.add(guildConfig.defaultJoinRole)
  }

  async fetchGuildConfig(guildId: string) {
    // Const guild = await GuildsModel.findOne({ guildId })
    // if (!guild) {
    //   return null
    // }
    // return guild
  }
}
