import {
  CommandReturnType,
  Category,
  Command,
  Logger,
  logger,
  SlashCommand,
  SlashCommandRunOptions,
  UserPermissions,
} from '@quanty/framework'
import { Message, MessageEmbed, TextBasedChannelFields } from 'discord.js'

@SlashCommand('clear', {
  description: 'Deletes up to 99 messages above this one.',
  options: [
    {
      type: 'INTEGER',
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
})
@Category('util')
@UserPermissions('MANAGE_CHANNELS', 'MANAGE_MESSAGES')
export class ClearCommand extends Command {
  @logger()
  private logger: Logger

  async run({ channel, options }: SlashCommandRunOptions): CommandReturnType {
    const amount = options.getInteger('amount', true)
    const user = options.getUser('member', false)

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
        .then(messages => {
          embed.setDescription(
            `Cleared ${messages.size} messages from ${user}.`,
          )
        })
      return { embeds: [embed], ephemeral: true }
    } else {
      await (channel as TextBasedChannelFields)
        .bulkDelete(amount, true)
        .then(messages => {
          embed.setDescription(`Cleared ${messages.size} messages.`)
        })
        .catch((err: any) => {
          this.logger.error(err)
          return {
            embeds: [embed.setDescription('An error happened')],
            ephemeral: true,
          }
        })
      return { embeds: [embed], ephemeral: true }
    }
  }

  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
