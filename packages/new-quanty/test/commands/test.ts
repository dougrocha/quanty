import 'reflect-metadata'

import { SlashCommand } from '../../src/decorators/SlashCommandDecorators'
import { Command } from '../../src/structures/command/Command'

@SlashCommand({
  name: 'test',
  description: 'testCommand description',
})
export class TestCommand extends Command {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  run(): void {}
  error(): void {
    throw new Error('Method not implemented.')
  }
}
