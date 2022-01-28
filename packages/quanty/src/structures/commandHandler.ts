import { PathLike } from 'fs'
import { promisify } from 'util'

import { Collection } from 'discord.js'
import { glob } from 'glob'

import Command from './Command'
import Logger from './Logger'

import QuantyClient from '../client'
import { BaseCommand, ICommandHandler } from '../types'

const globPromise = promisify(glob)

interface ImportCommand {
  command: BaseCommand
}

class CommandHandler implements ICommandHandler {
  private logger: Logger = new Logger('Command-Handler')

  private client: QuantyClient

  private dir: PathLike

  readonly categories: Set<string> = new Set()

  readonly commands: Collection<string, Command> = new Collection<
    string,
    Command
  >()

  readonly aliases: Collection<string, Command> = new Collection<
    string,
    Command
  >()

  readonly cooldowns: Collection<string, number> = new Collection<
    string,
    number
  >()

  public static commandsCount = 0

  constructor(client: QuantyClient, dir: PathLike) {
    this.client = client

    this.dir = dir

    this.client.once('ready', async () => {
      await this.init()
    })
  }

  public getCommand(name: string): Command | undefined {
    const cmd = this.commands.get(name)
    return cmd
  }

  public getCommands(): Command[] | undefined {
    const cmds = this.commands.toJSON()
    return cmds
  }

  public get commandsCount() {
    return CommandHandler.commandsCount
  }

  /**
   * Deletes all commands
   */
  public sweepCommands() {
    this.commands.sweep(() => true)
  }

  /**
   * Deletes Commands
   * @param name Name of Command
   */
  public deleteCommand(name: string) {
    this.commands.delete(name)
  }

  private setCommand(name: string, command: Command) {
    this.commands.set(name, command)
  }

  /**
   * Creates a command when given a command file path
   * @param file File Path
   */

  private async createCommand(file: string) {
    const { command } = (await import(file)) as ImportCommand

    const cmd = new Command(
      this.client,
      command.name,
      command.run,
      command,
      command.error,
    )

    this.setCommand(command.name, cmd)
  }

  /**
   * Load all commands
   */
  private async init() {
    const commandFiles: string[] = await globPromise(
      `${this.dir}/../commands/**/*{.ts,.js}`,
    )

    commandFiles.map(async (file: string) => {
      await this.createCommand(file)
      CommandHandler.commandsCount++
    })

    if (this.client.defaults?.defaultCommands.all == true) {
      const localCommandFiles: string[] = await globPromise(
        '../commands/**/*{.ts}',
      )
      localCommandFiles.map(async (file: string) => {
        await this.createCommand(file)
        CommandHandler.commandsCount++
      })
    }

    this.logger.success(`${CommandHandler.commandsCount} Commands Loaded`)
  }
}

export default CommandHandler
