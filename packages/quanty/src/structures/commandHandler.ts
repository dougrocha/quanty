import { PathLike } from 'fs'
import { promisify } from 'util'

import { Collection } from 'discord.js'
import { glob } from 'glob'

import Command from './command'
import Logger from './logger'

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

    return cmd
  }

  /**
   * Load all commands
   */
  private async init() {
    const commandFiles: string[] = await globPromise(
      `${this.dir}/../commands/**/*{.ts,.js}`,
    )

    await Promise.all(
      commandFiles.map(async (file: string) => {
        await this.createCommand(file)
      }),
    )

    const defaultsValue = this.client.defaults?.defaultCommands.all

    if (!defaultsValue || defaultsValue == true) {
      // This glob pattern is set to support both local testing and production
      // the [!.d] will ignore .d.ts files
      // while .ts is for local and .js is for production package
      const localCommandFiles: string[] = await globPromise(
        `${__dirname}/../commands/**/*[!.d]{.ts,.js}`,
      )

      const commands: Command[] = []

      await Promise.all(
        localCommandFiles.map(async (file: string) => {
          const cmd = await this.createCommand(file)
          commands.push(cmd)
        }),
      )

      await this.loadDefaultCommands(commands)
    }

    this.logger.success(`Commands Loaded: ${this.commands.size}`)
  }

  private async loadDefaultCommands(commands: Command[]) {
    const client = this.client
    const globalCommands = client.application?.commands

    commands.map(async cmd => {
      await globalCommands?.create({
        name: cmd.name,
        description: cmd.description,
        options: cmd.options,
      })
    })
  }
}

export default CommandHandler
