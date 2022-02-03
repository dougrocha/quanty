import { GuildMember } from 'discord.js'
import ms from 'ms'

import { CommandHandler } from '.'

import QuantyClient from '../client'

class SlashCommandHandler {
  private client: QuantyClient

  private commandHandler: CommandHandler

  constructor(client: QuantyClient, commandHandler: CommandHandler) {
    this.client = client
    this.commandHandler = commandHandler

    this.init()
  }

  private init() {
    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) {
        return
      }

      const { client } = this

      const command = this.commandHandler.getCommand(interaction.commandName)

      if (!command) {
        await interaction.reply({
          content: 'Sorry this command doesnt exist.',
        })

        client.commandHandler.deleteCommand(interaction.commandName)
        return
      }

      const {
        isOwnerOnly,
        userPermissions,
        clientPermissions,
        name: commandName,
        userCooldowns,
        isGuildOnly,
        nsfw,
      } = command

      if (!isGuildOnly) return

      const { guild, channel, options, channelId } = interaction
      const member = interaction.member as GuildMember

      const { user } = client

      if (!user) return

      if (nsfw == true) {
        await interaction.reply({
          content: 'This command is for nsfw channels only.',
          ephemeral: true,
        })
        return
      }

      if (userPermissions?.length) {
        // Check if user has permissions for command
        const missingPerms = guild?.members.cache
          .get(member.id)
          ?.permissionsIn(channelId)
          .missing(userPermissions)
        if (missingPerms?.length) {
          await interaction.reply(
            `You need \`${missingPerms.map(
              val => `${val}`,
            )}\` permissions to use \`${commandName}\`.`,
          )
          return
        }
      }

      /** Checks if Quanty has permissions in server to start command */
      if (clientPermissions) {
        const missingPerms = guild?.members.cache
          .get(user?.id)
          ?.permissionsIn(channelId)
          .missing(clientPermissions)
        if (missingPerms?.length) {
          await interaction.reply(
            `I can't use \`${commandName}\` because I am missing \`${missingPerms.map(
              val => `${val}`,
            )}\` permissions.`,
          )
          return
        }
      }

      // Checks if command is Bot owner Only
      if (isOwnerOnly && !client.botOwners?.some(id => member.id == id)) {
        await interaction.reply(
          'Only the owner of Quanty can use this command.',
        )
        return
      }

      const cd = `${commandName}-${member.id}`

      const userCooldown = userCooldowns.get(member.id)

      /** Checks if cooldown exists for command */
      if (userCooldown) {
        if (client.commandHandler.cooldowns.has(cd)) {
          await interaction.reply(
            `You can use this command in ${ms(
              (client.commandHandler.cooldowns.get(cd) as number) - Date.now(),
              { long: true },
            )}`,
          )
        } else {
          /** Sets time to delete cooldown from collection */
          client.commandHandler.cooldowns.set(cd, Date.now() + userCooldown)
          setTimeout(() => {
            client.commandHandler.cooldowns.delete(cd)
          }, userCooldown)
        }
      }

      await command.runSlashCommand({
        client,
        interaction,
        guild,
        member,
        channel,
        options,
      })
    })
  }
}

export default SlashCommandHandler
