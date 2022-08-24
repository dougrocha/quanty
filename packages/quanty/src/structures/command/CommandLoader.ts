import { resolve } from 'path'

import { ApplicationCommandOptionData, Collection } from 'discord.js'

import type { Command } from './Command'
import type { CommandRegistry } from './CommandRegistry'

import { Messages } from '../../errors'
import { isConstructor } from '../../util'
import { Logger, logger } from '../../util/Logger'
import type { QuantyClient } from '../client/Client'
import type { IQuantyDefaults } from '../client/types/client'

interface ApplicationCommandData {
  name: string
  description: string
  options: ApplicationCommandOptionData[]
}

export class CommandLoader {
  private client: QuantyClient

  @logger()
  private _logger!: Logger

  private commands: CommandRegistry

  private testCommands: Collection<string, ApplicationCommandData> =
    new Collection()

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

    const commandsPath: string = resolve(
      defaultCommands
        ? `${__dirname}/base`
        : `${this.client.baseDirectory || ''}${commandsDir}`,
    )

    const commandFiles: string[] = await this.client.globPromise(
      `${commandsPath}/**/!(*.d){.ts,.js}`,
    )

    commandFiles.map(async file => {
      const command = await import(file)
      const classInstance: new () => Command = command[Object.keys(command)[0]]

      if (!isConstructor(classInstance))
        return this._logger.warn(Messages.EXPORT_INVALID(file, 'command'))

      const commandInstance: Command = new classInstance()

      const { commandName: name, description, options } = commandInstance

      // Will push test command to array
      if (commandInstance.test)
        this.testCommands.set(name, { name, description, options })

      this.commands.registerCommand(commandInstance)
    })
  }

  /**
   * Will only run if test commands are available
   * @param devGuilds Test Guilds
   */
  public async loadTestCommands(devGuilds: string[] | string) {
    this.client.once('ready', async () => {
      // Will go through every dev guild and complete task
      for (const guildId of devGuilds) {
        const guild = await this.client.guilds.fetch(guildId)

        const guildCommands = await guild.commands.fetch()

        guildCommands.map(async cmd => {
          const testCmd = this.testCommands.find(
            testCmd =>
              testCmd.name === cmd.name ||
              testCmd.description === cmd.description,
          )

          // If Guild Command does not exist in test commands list. It will delete from guild.
          if (!testCmd) {
            this._logger.debug(
              `Deleting test command ${cmd.name} in ${guild.name}.`,
            )

            return await cmd.delete()
          }

          // If the commands arent matching, It will update
          const isEqual = cmd.equals(testCmd)

          if (!isEqual) {
            this._logger.debug(
              `Editing test command ${testCmd.name} in ${guild.name}.`,
            )

            return guild.commands.edit(cmd, testCmd)
          }
        })

        this.testCommands.map(async cmd => {
          // If Guild Command does not exist in test commands list. It will create in guild.
          if (
            guildCommands.find(gcmd => {
              return (
                gcmd.name === cmd.name || gcmd.description === cmd.description
              )
            })
          )
            return

          await guild.commands.create(cmd)

          this._logger.debug(
            `Creating new test command: ${cmd.name.toUpperCase()} in ${
              guild.name
            }.`,
          )
        })
      }
    })
  }
}
