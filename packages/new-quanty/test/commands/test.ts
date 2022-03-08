import { SlashCommand } from '../../src/decorators/SlashCommandDecorators'
import { Command } from '../../src/structures/command/Command'

@SlashCommand({
  name: 'test',
  description: 'testCommand description',
})
export class TestCommand extends Command {
  run(): void {
    throw new Error('Method not implemented.')
  }
  error(): void {
    throw new Error('Method not implemented.')
  }
}
