import { Event, logger, Logger, On } from '@quanty/framework'
import { Message, MessageEmbed, TextChannel } from 'discord.js'

@On('messageDelete')
export class MessageDeleteEvent extends Event<'messageDelete'> {
  @logger()
  private logger!: Logger

  async run(message: Message) {
    // Const { guild, channel: msgChannel, author, content } = message
    // if (!guild) return
    // if (!(msgChannel instanceof TextChannel)) return
    // if (author.bot) return
    // const fetchedLogs = await guild.fetchAuditLogs({
    //   limit: 1,
    //   type: 'MESSAGE_DELETE',
    // })
    // const deletionLog = fetchedLogs.entries.first()
    // if (!deletionLog)
    //   return console.log(
    //     `A message by ${author.tag} was deleted, but no relevant audit logs were found.`,
    //   )
    // // Now grab the user object of the person who deleted the message
    // // Also grab the target of this action to double-check things
    // const { executor, target } = deletionLog
    // const guildConfig = await this.fetchGuildConfig(guild.id)
    // const webHookChannelId = guildConfig?.logChannel
    // if (!webHookChannelId) return
    // const channel = await this.client.channels.fetch(webHookChannelId)
    // // Channel must be guild channel
    // if (!(channel instanceof TextChannel)) return
    // const webhooks = await channel.fetchWebhooks()
    // const channelHook = webhooks.find(wh => wh.channelId == channel.id)
    // const embed = new MessageEmbed()
    //   .setTitle('Message Deleted')
    //   .addFields([
    //     {
    //       name: 'User:',
    //       value: this.highlight(target.tag),
    //       inline: true,
    //     },
    //     {
    //       name: 'Channel:',
    //       value: this.highlight('#' + (msgChannel as TextChannel).name),
    //       inline: true,
    //     },
    //     {
    //       name: 'Deleted by:',
    //       value: this.highlight(executor?.tag ?? 'Invalid'),
    //     },
    //   ])
    //   .setDescription(content)
    //   .setTimestamp(Date.now())
    // await channelHook?.send({
    //   embeds: [embed],
    // })
  }

  async fetchGuildConfig(guildId: string) {
    // Const guild = await GuildsModel.findOne({ guildId })
    // if (!guild) {
    //   return null
    // }
    // return guild
  }

  highlight(text: string) {
    return `\`\`${text}\`\``
  }
}
