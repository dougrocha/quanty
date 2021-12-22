import { Command } from 'commander';

export abstract class AbstractCommand {
  public abstract load(program: Command): void;
}
