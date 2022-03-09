import { Interaction, CacheType } from 'discord.js'

import { On } from '../../../decorators/event/EventDecorators'
import { CommandVerificationError } from '../../../errors/Errors'
import { Logger, logger } from '../../../util/Logger'
import { Command } from '../../command/Command'
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

    const {
      ownerOnly,
      userPermissions,
      clientPermissions,
      commandName,
      userCooldowns,
      guildOnly,
      nsfwOnly,
    } = command
  }
}
