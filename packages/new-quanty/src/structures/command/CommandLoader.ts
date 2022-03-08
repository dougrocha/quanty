import path from 'path'
import { promisify } from 'util'

import glob from 'glob'

import { Command } from './Command'
import { CommandRegistry } from './CommandRegistry'

import { Logger, logger } from '../../util/Logger'
import { QuantyClient } from '../client/Client'
import { IQuantyDefaultCommands } from '../client/typings/IQuantyClient'

const globPromise = promisify(glob)

export class CommandLoader {
  private client: QuantyClient

  @logger()
  private _logger!: Logger

  private commands: CommandRegistry

  constructor(client: QuantyClient) {
    this.client = client

    this.commands = client.commands
  }

  public async loadCommands(
    commandsDir: string | null,
    defaultCommands: boolean | IQuantyDefaultCommands | undefined = true,
  ) {
    this._logger.debug(
      `Starting to load commands. Path: ${commandsDir ?? 'Default'}, ${
        `including defaultCommands:` + Object.keys(defaultCommands)
      } `,
    )

    const commandsPath: string = path.resolve(
      defaultCommands
        ? `${__dirname}/base`
        : `${this.client.baseDir || ''}${commandsDir}`,
    )

    const commandFiles: string[] = await globPromise(`${commandsPath}/**/*.ts`)

    commandFiles.map(async file => {
      const command = await require(file)

      const classInstance: new () => Command = command[Object.keys(command)[0]]
      const commandInstance: Command = new classInstance()

      Object.defineProperty(commandInstance, '_className', {
        value: Object.keys(command)[0],
        enumerable: true,
        writable: false,
        configurable: false,
      })

      this.commands.registerCommand(commandInstance)
    })
  }
}
