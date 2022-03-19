import {
  SlashCommand,
  GuildOnly,
  Test,
  Command,
  SlashCommandRunOptions,
  AsyncCommandReturnType,
} from '../../src'

@SlashCommand('echo', {
  description: 'This command is built for testing',
  options: [{ name: 'text', description: "Echo's text.", type: 'STRING' }],
})
@GuildOnly()
@Test()
export class TestCommand extends Command {
  async run({ options }: SlashCommandRunOptions): AsyncCommandReturnType {
    return {
      content: `${options.getString('text')}`,
    }
  }

  error(): void {
    throw new Error('Method not implemented.')
  }
}
