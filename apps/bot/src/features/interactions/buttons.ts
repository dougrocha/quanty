import { Feature } from '@quanty/framework'

export const feature: Feature<'interactionCreate'> = {
  name: 'interactionCreate',
  run: (client, interaction) => {
    if (!interaction.isButton()) return

    console.log(interaction)
  },
}
