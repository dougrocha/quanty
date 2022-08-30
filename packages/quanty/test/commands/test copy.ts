import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js'

import { SlashCommand, GuildOnly, Test } from '../../src'
import { Command } from '../../src/structures/command/CommandStore'

@SlashCommand('COPYecho', {
  description: 'This command is built for echoing',
  options: [
    {
      name: 'text',
      description: "Echo's text.",
      type: ApplicationCommandOptionType.String,
    },
  ],
})
@GuildOnly()
@Test()
export class EchoCOPYCommand extends Command {
  async run(interaction: CommandInteraction) {
    interaction.reply({
      content: `${interaction.options.get('text')}`,
    })
  }

  // error(e: any, options?: CommandOptions): CommandReturnType {
  //   throw new Error('Method not implemented.')
  // }
}
