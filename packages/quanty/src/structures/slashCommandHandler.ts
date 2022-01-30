import { GuildMember } from 'discord.js'

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

      await interaction.deferReply()

      const command = this.commandHandler.getCommand(interaction.commandName)

      if (!command) {
        await interaction.editReply({
          content: 'Sorry this command doesnt exist.',
        })
        return
      }

      const { guild, channel, options } = interaction
      const member = interaction.member as GuildMember

      const { client } = this

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
