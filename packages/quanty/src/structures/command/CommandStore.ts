import type {
  ApplicationCommandOptionData,
  Awaitable,
  CommandInteraction,
  ContextMenuCommandInteraction,
} from 'discord.js'
import { Logger } from '../../util'

import { Part } from '../part/Part'
import { Store } from '../store/store'

export interface CommandOptions extends Part.Options {
  readonly description: string

  readonly detailedDescription?: string
}

export namespace Command {
  export type Options = CommandOptions & ApplicationCommandOptionData
}

export class Command<O extends Command.Options = Command.Options> extends Part {
  public description?: string

  public detailedDescription?: string

  protected logger?: Logger

  // public readonly slashOptions?: ApplicationCommandOptionData

  public constructor(context: Part.Context, options: O = {} as O) {
    super(context, options)

    this.logger = new Logger(`COMMAND:${this.name}`)
  }

  public run?(interaction: CommandInteraction): Awaitable<void>

  public contextRun?(
    interaction: ContextMenuCommandInteraction,
  ): Awaitable<void>
}

export class CommandStore extends Store<Command> {
  public constructor() {
    super(Command, { name: 'commands' })
  }
}
