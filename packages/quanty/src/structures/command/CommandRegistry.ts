import { Collection } from 'discord.js'

import type { Command } from './Command'

import { logger, Logger } from '../../util/Logger'
import type { QuantyClient } from '../client/Client'

export class CommandRegistry extends Collection<string, Command> {
  private client: QuantyClient

  @logger()
  private readonly _logger!: Logger

  public aliases: Collection<string, Command> = new Collection()

  constructor(client: QuantyClient) {
    super()

    this.client = client
  }

  /**
   * Registers command
   * @param command
   */
  public registerCommand(command: Command) {
    this._logger.debug(
      `Registered command: ${command.commandName.toUpperCase()}`,
    )

    command._init(this.client)

    this.set(command.commandName, command)
  }
}
