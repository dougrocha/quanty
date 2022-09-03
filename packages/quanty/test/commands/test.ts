import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js'

import { SlashCommand, GuildOnly, Test } from '../../src'
import { UseGuards } from '../../src/decorators/core/useGuards'
import { Command } from '../../src/structures/command/Command'

interface CanActivate {
  canActivate(context: unknown): boolean | Promise<boolean>
}

class TestingGuard implements CanActivate {
  async canActivate(context: unknown): boolean | Promise<boolean> {
    console.log('guard', context)
    return true
  }
}

@SlashCommand('anime', {
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
export class EchoCommand extends Command {
  @UseGuards(TestingGuard)
  async run(interaction: CommandInteraction) {
    // console.log("I'm running")
    // interaction.reply({
    //   content: `${interaction.options.get('text')}`,
    // })
  }

  // error(e: any, options?: CommandOptions): CommandReturnType {
  //   throw new Error('Method not implemented.')
  // }
}
