import 'reflect-metadata'

import { GuildOnly } from '../../src/decorators'
import { SlashCommand } from '../../src/decorators/command/SlashCommandDecorators'
import { Command } from '../../src/structures/command/Command'

@SlashCommand({
  name: 'test',
  description: 'testCommand description',
})
@GuildOnly()
export class TestCommand extends Command {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  run(): void {}
  error(): void {
    throw new Error('Method not implemented.')
  }
}
