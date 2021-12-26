import { Message, MessageEmbed, TextBasedChannelFields } from 'discord.js'
import { Command } from '@quanty/framework'

export const command: Command = {
  name: 'clear',
  description: 'Deletes up to 99 messages above this one',
  options: [
    {
      type: 'NUMBER',
      name: 'amount',
      description: 'Number of messages to delete',
      required: true,
    },
    {
      type: 'USER',
      name: 'member',
      description: 'Specific member messages',
      required: false,
    },
  ],
  category: 'util',
  userPermissions: ['MANAGE_CHANNELS'],
  cmdType: 'slash',
  run: async ({ client, channel, options }) => {
    const amount = options.getInteger('amount') ?? -1
    const user = options.getUser('member')

    if (amount <= 0 || amount > 100) {
      return {
        content: 'You need to input a number between 1 and 99.',
      }
    }

    const messages = await channel.messages.fetch()

    const embed = new MessageEmbed().setColor('RANDOM')

    if (user) {
      let i = 0
      const filtered: Message[] = []
      messages.filter((msg): any => {
        if (msg.author.id === user.id && amount > i) {
          filtered.push(msg)
          i++
        }
      })

      await (channel as TextBasedChannelFields)
        .bulkDelete(filtered, true)
        .then(async messages => {
          embed.setDescription(
            `Cleared ${messages.size} messages from ${user}.`,
          )
          return { embeds: [embed], ephemeral: true }
        })
    } else {
      await (channel as TextBasedChannelFields)
        .bulkDelete(amount, true)
        .then(async messages => {
          embed.setDescription(`Cleared ${messages.size} messages.`)
          return { embeds: [embed], ephemeral: true }
        })
        .catch(async (err: any) => {
          client.logger.error(err)
          return {
            content: 'An error happened',
            ephemeral: true,
          }
        })
    }
  },
}
