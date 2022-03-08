import { Collection } from 'discord.js'

import { Command } from './Command'

import { logger, Logger } from '../../util/Logger'
import { QuantyClient } from '../client/Client'

export class CommandRegistry extends Collection<string, Command> {
  private client: QuantyClient

  @logger()
  private readonly _logger!: Logger

  public aliases: Collection<string, Command> = new Collection()

  constructor(client: QuantyClient) {
    super()

    this.client = client
  }

  public registerCommand(command: Command) {
    this._logger.debug(
      `Registrating command: ${command.commandName.toUpperCase()}`,
    )

    command._init(this.client)

    this.set(command.commandName, command)
  }
}
