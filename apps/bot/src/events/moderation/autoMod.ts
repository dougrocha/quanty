import { On, Event, logger, Logger } from '@quanty/framework'
import { Message } from 'discord.js'

@On('messageCreate')
export class AutoModEvent extends Event<'messageCreate'> {
  @logger()
  private logger!: Logger

  async run(message: Message<boolean>) {
    // if (!message.guild || message.type != 'DEFAULT') return
    // const guildPlugins = await GuildPluginsModel.findOne(
    //   {
    //     guildId: message.guild.id,
    //     plugins: 'automod',
    //   },
    //   'guildId plugins blacklistedWords',
    // ).lean()
    // if (!guildPlugins?.autoMod) {
    //   return
    // }
    // if (message.author.bot || !message.guild)
    //   // If message is from bot or in a dm
    //   return
    // // If message content is larger than limit
    // if (message.content.length > 300) {
    //   await message.reply({
    //     content: 'Please do not send super long messages.',
    //   })
    //   await message.delete()
    //   return
    // }
    // if (
    //   message.mentions.users.size > 2 &&
    //   !message.member?.permissions.has('ADMINISTRATOR')
    // ) {
    //   await message.reply('You cannot spam mentions.')
    //   await message.delete()
    //   return
    // }
    // const lineArray = message.content.match(/\n/g) ?? ''
    // if (lineArray?.length >= 4) {
    //   await message.reply('You cannot send messages')
    //   await message.delete()
    //   return
    // }
    // const blacklistedWords = guildPlugins?.blacklistedWords
    // if (!blacklistedWords?.length) return
    // for (let i = 0; i < blacklistedWords.length; i++) {
    //   const isIncludedMsg = message?.content
    //     ?.toLowerCase()
    //     .includes(blacklistedWords[i])
    //   if (isIncludedMsg) {
    //     await message.reply('You cannot say that here')
    //     await message.delete()
    //     return
    //   }
    // }
    // if (!message.guild || message.type != 'DEFAULT') return
  }
}
