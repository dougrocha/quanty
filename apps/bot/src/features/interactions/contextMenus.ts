import { Event, On } from '@quanty/framework'
import { Interaction, CacheType } from 'discord.js'

@On('interactionCreate')
export class ContextMenuEvent extends Event<'interactionCreate'> {
  async run(interaction: Interaction<CacheType>) {
    if (!interaction.isContextMenu()) return

    await interaction.deferReply({ ephemeral: false })

    // const command = this.client.commandHandler.commands.get(interaction.commandName)

    // if (command) await command.run({ client, interaction })if (!interaction.isContextMenu()) return

    // await interaction.deferReply({ ephemeral: false })

    // const command = client.commandHandler.commands.get(interaction.commandName)

    // if (command) await command.run({ client, interaction })
  }
}
