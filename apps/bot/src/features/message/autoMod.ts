import { Feature } from '@quanty/framework'

export const feature: Feature<'messageCreate'> = {
  name: 'messageCreate',
  run: async (client, message) => {
    const guildPlugins = client.guildManager.findGuild(message.guild?.id || '')

    const isAutomod = guildPlugins?.moderation.autoMod

    if (!isAutomod) {
      return
    }

    if (message.author.bot || !message.guild)
      // If message is from bot or in a dm
      return
    // If message content is larger than limit
    if (message.content.length > 300) {
      await message.reply({
        content: 'Please do not send super long messages.',
      })
      await message.delete()
      return
    }

    if (
      message.mentions.users.size > 2 &&
      !message.member?.permissions.has('ADMINISTRATOR')
    ) {
      await message.reply('You cannot spam mentions.')
      await message.delete()
      return
    }

    const lineArray = message.content.match(/\n/g) ?? ''

    if (lineArray?.length >= 4) {
      await message.reply('You cannot send messages')
      await message.delete()
      return
    }

    const blacklistedWords = ['fuck', 'bitch']

    for (let i = 0; i < blacklistedWords.length; i++) {
      const isIncludedMsg = message?.content
        ?.toLowerCase()
        .includes(blacklistedWords[i])

      if (isIncludedMsg) {
        await message.reply('You cannot send messages')
        await message.delete()

        return
      }
    }
  },
}
