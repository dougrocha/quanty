import type { Interaction, CacheType } from 'discord.js'

import { On, logger, Logger } from '../../../index'
import type { CommandReturnObj } from '../../command'
import { Event } from '../Event'

@On('interactionCreate')
export class Base_Interaction_CommandHandler extends Event<'interactionCreate'> {
  @logger()
  private logger!: Logger

  async run(interaction: Interaction<CacheType>) {
    if (!interaction.isCommand()) {
      return
    }

    const command = this.client.commands.get(interaction.commandName)

    // If command does not exist delete command
    if (!command) {
      await interaction.reply({
        content: 'Sorry this command doesnt exist.',
      })
      const guildId = interaction.guildId

      // If interaction was in guild delete from guild commands
      if (guildId) {
        const guild = await (await this.client.guilds.fetch())
          .get(guildId)
          ?.fetch()

        await guild?.commands.delete(interaction.commandId)
      }

      // Delete command from commands cache
      this.client.commands.delete(interaction.commandName)
      return
    }

    const { guild, channel, options, user } = interaction

    if (!channel || !guild) return

    const client = this.client

    let result: CommandReturnObj

    try {
      result = await command.run({
        channel,
        client,
        guild,
        interaction,
        user,
        options,
      })
    } catch (e) {
      if (typeof command.error === 'function') {
        result = await command.error(e, {
          channel,
          client,
          guild,
          interaction,
          user,
          options,
        })
      } else if (typeof client.defaultCommandError === 'string') {
        result = client.defaultCommandError
      }
    }

    if (!result) return

    await interaction.reply(result)
  }
}
