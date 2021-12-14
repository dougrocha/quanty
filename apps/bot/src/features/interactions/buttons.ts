import { FeatureBuilder } from '../../../quanty/types';

export const feature: FeatureBuilder<'interactionCreate'> = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    if (!interaction.isButton()) return;

    console.log(interaction);
  },
};
