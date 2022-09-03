import { Store } from '../store/store'
import { Command } from './Command'

export class CommandStore extends Store<Command> {
  public constructor() {
    super(Command, { name: 'commands' })
  }
}
