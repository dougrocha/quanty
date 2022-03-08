import { Message } from 'discord.js'

import { On } from '../../../decorators/EventDecorators'
import { Logger, logger } from '../../../util/Logger'
import { Command } from '../../command/Command'
import { Event } from '../Event'

@On('messageCreate')
export class MessageHandler extends Event<'messageCreate'> {
  @logger()
  private logger!: Logger

  async run(message: Message<boolean>) {
    if (message.author.bot || !message.guild) return

    const { command, args } = this._findCommand(message)
    if (!command) return

    const { client } = this
    const { guild, member, channel } = message

    const {
      ownerOnly,
      userPermissions,
      guildOnly,
      clientPermissions,
      commandName,
      userCooldowns,
    } = command

    // command.runMsgCommand({
    //   client,
    //   message,
    //   guild,
    //   member,
    //   channel,
    //   args,
    // })
  }

  private _findCommand(message: Message): {
    command: Command | undefined
    args: string[] | undefined
  } {
    const defaultPrefix = this.client.getPrefix()

    const prefix = message.content.match(this.client._RegExpPrefix)
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        message.content.match(this.client._RegExpPrefix)![0]
      : defaultPrefix

    if (!message.content.toLowerCase().startsWith(prefix))
      return { command: undefined, args: undefined }

    const args: string[] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g)

    const commandName: string | undefined = args.shift()?.toLowerCase()

    if (!commandName)
      return {
        command: undefined,
        args,
      }

    const command =
      this.client.commands.get(commandName) ||
      this.client.commands.aliases.get(commandName)

    return { command, args }
  }
}
