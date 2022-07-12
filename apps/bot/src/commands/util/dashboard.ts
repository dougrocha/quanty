import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
} from '@quanty/framework'
import { MessageActionRow, MessageButton } from 'discord.js'

@SlashCommand('dashboard', {
  description: 'Sends a link to your dashboard.',
})
@Category('util')
export class DashboardCommand extends Command {
  async run({ guild }: SlashCommandRunOptions): CommandReturnType {
    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Go to your dashboard')
        .setStyle('LINK')
        .setURL(`https://quanty.xyz/dashboard/${guild.id}`),
    )

    return {
      content: 'Here you go',
      components: [button],
    }
  }

  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
