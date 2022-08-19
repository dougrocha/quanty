import { ApplicationCommandOptionType } from 'discord.js'

import {
  SlashCommand,
  GuildOnly,
  Command,
  CommandOptions,
  CommandReturnType,
  Test,
} from '../../src'

@SlashCommand('echo', {
  description: 'This command is built for testing',
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
export class TestCommand extends Command {
  async run({ options }: CommandOptions): CommandReturnType {
    return {
      content: `${options.getString('text')}`,
    }
  }

  error(e: any, options?: CommandOptions): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
