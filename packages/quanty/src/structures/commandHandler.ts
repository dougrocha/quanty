import { glob } from 'glob';
import { promisify } from 'util';
const globPromise = promisify(glob);

import QuantyClient from '../client';
import Logger from './logger';

import { Collection } from 'discord.js';
import { IBaseCommand, ICommandHandler } from '../types';
import Command from './command';

class CommandHandler implements ICommandHandler {
  private logger: Logger = new Logger('Command-Handler');

  private client: QuantyClient;

  readonly categories: Set<string> = new Set();
  readonly commands: Collection<string, Command> = new Collection();
  readonly aliases: Collection<string, Command> = new Collection();
  readonly cooldowns: Collection<string, number> = new Collection();

  constructor(client: QuantyClient, dir: string) {
    this.client = client;

    this.loadCommands(dir);
  }

  public getCommands(): Command[] | undefined {
    const cmds = this.commands.toJSON();
    return cmds;
  }

  public getCommand(name: string): Command | undefined {
    const cmd = this.commands.get(name);
    return cmd;
  }

  /**
   * Deletes all commands
   */
  public sweepCommands() {
    this.commands.sweep(() => true);
  }

  /**
   * Deletes Commands
   * @param name Name of Command
   */
  public deleteCommand(name: string) {
    this.commands.delete(name);
  }

  private setCommand(name: string, command: Command) {
    this.commands.set(name, command);
  }

  /**
   * Creates a command when given a command file path
   * @param file File Path
   */
  private async createCommand(file: string) {
    const { command }: { command: IBaseCommand } = await import(file);

    const cmd = new Command(
      this.client,
      command.name,
      command.run,
      command.error,
      command
    );

    this.setCommand(command.name, cmd);
  }

  /**
   * @private
   * Load all commands
   */
  private async loadCommands(dir: string) {
    const commandFiles: string[] = await globPromise(
      `${dir}/../commands/**/*{.ts,.js}`
    );

    commandFiles.map(async (file: string) => {
      this.createCommand(file);
    });

    this.logger.success('All Commands Loaded');
  }
}

export default CommandHandler;
