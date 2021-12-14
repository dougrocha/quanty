import { FeatureBuilder } from '../../../quanty/types';

export const feature: FeatureBuilder<'interactionCreate'> = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    if (!interaction.isContextMenu()) return;

    await interaction.deferReply({ ephemeral: false });

    const command = client.commandHandler.commands.get(interaction.commandName);

    if (command) command.run({ client, interaction });
  },
};
