import { Message } from 'discord.js'
import ms from 'ms'
import { ICommandHandler, IGuildManager } from 'types'

import { CommandHandler, QuantyLogger } from '.'

import QuantyClient from '../client'

class MessageHandler {
  private client: QuantyClient

  private logger: QuantyLogger = new QuantyLogger('Message-Handler')

  private commandHandler: ICommandHandler

  private guildManager: IGuildManager

  constructor(
    client: QuantyClient,
    commandHandler: CommandHandler,
    guildManager: IGuildManager,
  ) {
    this.client = client
    this.commandHandler = commandHandler
    this.guildManager = guildManager

    this.init()
  }

  private init(): void {
    this.client.on('messageCreate', async (message: Message) => {
      /* Regex for Client Mentions */
      const clientMention = RegExp(`^<@!?${this.client.user?.id}>`)

      if (message.author.bot || !message.guild) return

      const { client } = this
      const { guild, channel, member, author } = message

      const guildPrefix = await this.guildManager.getPrefix(guild.id)

      const prefix = message.content.match(clientMention)
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          message.content.match(clientMention)![0]
        : guildPrefix

      if (!message.content.toLowerCase().startsWith(prefix)) return

      const args: string[] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g)

      const cmd: string | undefined = args.shift()?.toLowerCase()
      if (!cmd) return

      const command =
        this.commandHandler.getCommand(cmd) ||
        this.commandHandler.aliases.get(cmd)

      if (!command) {
        return this.logger.log(
          `\`${cmd.substring(
            0,
            20,
          )}\` message command does not exist. Please refresh command list.`,
        )
      }

      const {
        isOwnerOnly,
        userPermissions,
        isGuildOnly,
        clientPermissions,
        userCooldowns,
        maxArgs,
      } = command

      if (maxArgs && args.length > maxArgs) return

      if (command.test && client.testServers?.some(id => id == guild.id)) return
      if (!isGuildOnly) return

      // Checks if command is Bot owner Only
      if (isOwnerOnly && !client.botOwners?.some(id => id == author.id)) {
        await message.reply('Only the owner of Quanty can use this command.')
        return
      }

      if (!member || !client.user) {
        await message.reply(
          `Something went wrong. Try again later or contact the owner`,
        )
        return
      }

      // Check if user has permissions for command
      if (userPermissions?.length) {
        const missingPerms = guild.members.cache
          .get(member.id)
          ?.permissionsIn(channel.id)
          .missing(userPermissions)
        if (missingPerms?.length) {
          await channel.sendTyping()
          await message.reply(
            `You are missing \`${missingPerms.map(val => `${val}`)}\``,
          )
          return
        }
      }

      /** Checks if Quanty has permissions in server to start command */
      if (clientPermissions) {
        const missingPerms = guild.members.cache
          .get(client.user.id)
          ?.permissionsIn(channel.id)
          .missing(clientPermissions)
        if (missingPerms?.length) {
          await channel.sendTyping()
          await message.reply(
            `I am missing \`${missingPerms.map(val => `${val}`)}\``,
          )
          return
        }
      }

      const cd = `${guild.id}-${author.id}`

      const userCooldown = userCooldowns.get(author.id)

      /** Checks if cooldown exists for command */
      if (userCooldown) {
        if (command.userCooldowns.has(cd)) {
          await message.reply(
            `You can use this command in ${ms(
              (command.userCooldowns.get(cd) as number) - Date.now(),
              { long: true },
            )}`,
          )
        } else {
          /** Sets time to delete cooldown from collection */
          command.userCooldowns.set(cd, Date.now() + userCooldown)
          setTimeout(() => {
            command.userCooldowns.delete(cd)
          }, userCooldown)
        }
      }

      await command.runMsgCommand({
        client,
        message,
        guild,
        member,
        channel,
        args,
      })
    })
  }
}

export default MessageHandler
