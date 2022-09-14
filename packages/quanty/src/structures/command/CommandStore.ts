import { TEST_COMMAND_METADATA } from '../../constants'
import { Store } from '../store/Store'
import { Command } from './Command'

export class CommandStore extends Store<Command> {
  public constructor() {
    super(Command, { name: 'commands' })
  }

  public async insert(part: Command): Promise<Command> {
    super.insert(part)

    const isTestCommand = Reflect.getMetadata(TEST_COMMAND_METADATA, part)

    if (isTestCommand) {
      // Load command in test guilds here
    }

    return part
  }
}
