import {
  SlashCommand,
  GuildOnly,
  Command,
  SlashCommandRunOptions,
  CommandReturnType,
} from '../../src'

@SlashCommand('echo', {
  description: 'This command is built for testing',
  options: [{ name: 'text', description: "Echo's text.", type: 'STRING' }],
})
@GuildOnly()
export class TestCommand extends Command {
  async run({ options }: SlashCommandRunOptions): CommandReturnType {
    return {
      content: `${options.getString('text')}`,
    }
  }

  error(e: any, options?: SlashCommandRunOptions): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
