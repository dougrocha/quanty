import { Feature } from '@quanty/framework'

export const feature: Feature<'interactionCreate'> = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    if (!interaction.isContextMenu()) return

    await interaction.deferReply({ ephemeral: false })

    const command = client.commandHandler.commands.get(interaction.commandName)

    if (command) await command.run({ client, interaction })
  },
}
