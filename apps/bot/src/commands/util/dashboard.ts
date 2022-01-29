import { Command } from '@quanty/framework'
import { MessageActionRow, MessageButton } from 'discord.js'

export const command: Command = {
  name: 'dashboard',
  description: 'Sends a link to your dashboard.',
  category: 'util',
  run: async ({ guild }) => {
    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Go to your dashboard')
        .setStyle('LINK')
        .setURL('https://www.quanty.xyz'),
    )

    return {
      content: 'Here you go',
      components: [button],
    }
  },
}
