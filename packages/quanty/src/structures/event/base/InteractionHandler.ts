import { Interaction, CacheType } from 'discord.js'

import { On, logger, Logger } from '../../../index'
import { Event } from '../Event'

@On('interactionCreate')
export class InteractionHandler extends Event<'interactionCreate'> {
  @logger()
  private logger!: Logger

  async run(interaction: Interaction<CacheType>) {
    if (!interaction.isCommand()) {
      return
    }

    const command = this.client.commands.get(interaction.commandName)

    if (!command) {
      await interaction.reply({
        content: 'Sorry this command doesnt exist.',
      })

      this.client.commands.delete(interaction.commandName)
      return
    }

    const { guild, channel, options, user } = interaction

    if (!channel || !guild) return

    const client = this.client

    const result = await command.run({
      channel,
      client,
      guild,
      interaction,
      user,
      options,
    })

    if (!result) return

    await interaction.reply(result)
  }
}
