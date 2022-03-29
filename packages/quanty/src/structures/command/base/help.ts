import { SlashCommand } from '../../../decorators'
import { Command } from '../Command'
import type { SlashCommandRunOptions, CommandReturnType } from '../types'

@SlashCommand('help', {
  description: 'Default help command for quanty bot.',
})
export class HelpCommand extends Command {
  async run({ guild }: SlashCommandRunOptions): CommandReturnType {
    console.log(guild)
  }

  error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
