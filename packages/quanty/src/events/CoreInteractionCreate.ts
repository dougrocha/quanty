import { CacheType, CommandInteraction, Events, Interaction } from 'discord.js'
import type { Command } from '../structures/command/Command'

import { Event } from '../structures/event/Event'

export class CoreCommandEvent extends Event<typeof Events.InteractionCreate> {
  public constructor(context: Event.Context) {
    super(context, { event: Events.InteractionCreate })
  }

  public run(interaction: Interaction<CacheType>) {
    if (interaction.isCommand()) {
      this.handleCommand(interaction)
    }
  }

  public async handleCommand(interaction: CommandInteraction) {
    const commandStore = this.container.stores?.get('commands')

    const command = (commandStore?.get(interaction.applicationId) ??
      commandStore?.get(interaction.commandName)) as Command

    if (!command) return

    if (command.typing) interaction.channel?.sendTyping()

    let guardsPayload

    try {
      guardsPayload = await command.handleGuards?.(interaction)
    } catch (error: unknown) {
      if (error instanceof Error) {
        await interaction.reply({
          content: error.message,
        })
      }
    }

    if (guardsPayload === false)
      return interaction.reply('You are not allowed to use this command.')

    try {
      const result = await command.run?.(interaction)

      // TODO: Handle exception
      if (!result) return

      await interaction.reply(result)
    } catch (error) {
      if (error instanceof Error) {
        const result = await command.error?.(error, interaction)
        // !TODO: Add a way to handle errors
        if (!result) return
        await interaction.reply(result)
      }
    }
  }
}

