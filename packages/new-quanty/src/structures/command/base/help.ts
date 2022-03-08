import { SlashCommand } from '../../../decorators/SlashCommandDecorators'
import { Command } from '../Command'
import { SlashCommandRunOptions, CommandReturnType } from '../typings/Command'

@SlashCommand({
  name: 'help',
  description: 'Default help command for quanty bot',
})
export class HelpCommand extends Command {
  run(options?: SlashCommandRunOptions): CommandReturnType {
    console.log(options)
  }
  error(): void {
    throw new Error('Method not implemented.')
  }
}
