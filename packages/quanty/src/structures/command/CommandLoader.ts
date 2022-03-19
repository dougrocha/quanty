import path from 'path'

import { Command } from './Command'
import { CommandRegistry } from './CommandRegistry'

import { Messages } from '../../errors'
import { isConstructor } from '../../util'
import { Logger, logger } from '../../util/Logger'
import { QuantyClient } from '../client/Client'
import { IQuantyDefaults } from '../client/types/client'

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
    defaultCommands: boolean | IQuantyDefaults | undefined = true,
  ) {
    this._logger.debug(
      `Starting to load ${
        commandsDir ? `commands. Path: ${commandsDir}` : `default commands.`
      }`,
    )

    const commandsPath: string = path.resolve(
      defaultCommands
        ? `${__dirname}/base`
        : `${this.client.baseDir || ''}${commandsDir}`,
    )

    const commandFiles: string[] = await this.client.globPromise(
      `${commandsPath}/**/*[!.d]{.ts,.js}`,
    )

    commandFiles.map(async file => {
      const command = await require(file)

      const classInstance: new () => Command = command[Object.keys(command)[0]]

      if (!isConstructor(classInstance))
        return this._logger.warn(Messages.EXPORT_INVALID(file, 'command'))

      const commandInstance: Command = new classInstance()

      this.commands.registerCommand(commandInstance)
    })
  }

  /**
   * Only supports first guild of array at the moment
   * @param devGuilds Test Guilds
   */
  public async loadTestCommands(devGuilds: string[] | string) {
    this.client.once('ready', async () => {
      let counter = 0
      const guild = await this.client.guilds.fetch(devGuilds[counter])

      await guild.commands.set([])

      this.commands.map(async cmd => {
        if (!cmd.test) return

        this._logger.debug(
          `Loading test command: ${cmd.commandName.toUpperCase()} in ${
            guild.name
          }.`,
        )

        const { commandName: name, description, options } = cmd

        await guild?.commands.create({
          name,
          description,
          options,
        })

        counter++
      })
    })
  }
}
