import { SlashCommand } from '../../../decorators'
import { Command } from '../Command'
import { SlashCommandRunOptions, AsyncCommandReturnType } from '../types'

@SlashCommand('help', {
  description: 'Default help command for quanty bot',
})
export class HelpCommand extends Command {
  async run({ guild }: SlashCommandRunOptions): AsyncCommandReturnType {
    console.log(guild)
  }

  error(): void {
    throw new Error('Method not implemented.')
  }
}
