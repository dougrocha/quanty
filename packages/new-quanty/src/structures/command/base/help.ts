import { SlashCommand } from '../../../decorators/SlashCommandDecorators'
import { Command } from '../Command'

@SlashCommand({
  name: 'help',
  description: 'Default help command for quanty bot',
})
export class HelpCommand extends Command {
  run(): void {
    throw new Error('Method not implemented.')
  }
  error(): void {
    throw new Error('Method not implemented.')
  }
}
