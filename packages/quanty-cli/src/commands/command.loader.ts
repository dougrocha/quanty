import chalk from 'chalk';
import { Command } from 'commander';
import GenerateCommand from './generate.command';

export class CommandLoader {
  public static load(program: Command) {
    new GenerateCommand().load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: any) {
    program.on('command:*', () => {
      console.error(
        `\nInvalid command: ${chalk.red('%s')}`,
        program.args.join(' ')
      );
      console.log(
        `See ${chalk.red('--help')} for a list of available commands.\n`
      );
      process.exit(1);
    });
  }
}
