import {
  CommandReturnType,
  Category,
  Command,
  Logger,
  logger,
  SlashCommand,
  CommandOptions,
  UserPermissions,
  Test,
} from '@quanty/framework'
import {
  ApplicationCommandOptionType,
  Message,
  EmbedBuilder,
  TextBasedChannelFields,
} from 'discord.js'

@SlashCommand('clear', {
  description: 'Deletes up to 99 messages above this one.',
  options: [
    {
      type: ApplicationCommandOptionType.Integer,
      name: 'amount',
      description: 'Number of messages to delete',
      required: true,
    },
    {
      type: ApplicationCommandOptionType.User,
      name: 'member',
      description: 'Specific member messages',
      required: false,
    },
  ],
})
@Category('util')
@UserPermissions('ManageChannels', 'ManageMessages')
@Test()
export class ClearCommand extends Command {
  @logger()
  private logger: Logger

  async run({ channel, options }: CommandOptions): CommandReturnType {
    const amount = options.getInteger('amount', true)
    const user = options.getUser('member', false)

    if (amount <= 0 || amount > 100) {
      return {
        content: 'You need to input a number between 1 and 99.',
      }
    }

    const messages = await channel.messages.fetch()

    const embed = new EmbedBuilder().setColor('Random')

    if (user) {
      let i = 0

      const filtered = messages.reduce<Message[]>((prev, curr): any => {
        if (curr.author.id === user.id && amount > i) {
          prev.push(curr)
          i++
        }
      }, [])

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
