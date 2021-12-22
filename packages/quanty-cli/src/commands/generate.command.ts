import { Command } from 'commander';

import inquirer from 'inquirer';
import { CommandAction } from '../actions/command.action';

import { AbstractCommand } from './abstract.command';

export type CommandType = {
  name: string;
  description?: string;
  category: string;
  type?: string;
};

export default class GenerateCommand extends AbstractCommand {
  public async load(program: Command): Promise<void> {
    program
      .command('generate <schematic> <path>')
      .alias('gen')
      .description('Generates a new file')
      .option('-i, --include-all', 'Includes all command features')
      .action(this.execute());
  }

  private execute() {
    //                command       ./src/commands    { includeAll: true }
    return async (schematic: string, path: string, commandOptions: any) => {
      inquirer
        .prompt(this.generateStarterPrompt(commandOptions))
        .then(async (baseOptions: any) => {
          inquirer
            .prompt(this.generatePrompt(baseOptions.allOptions))
            .then((extraOptions: any) => {
              const args = Object.assign({}, baseOptions, extraOptions, {
                path,
              });
              CommandAction.execute(schematic, args);
            });
        });
    };
  }

  private generateStarterPrompt(
    options: any
  ): inquirer.QuestionCollection<any> {
    const prompt: inquirer.QuestionCollection<any>[] = [
      {
        type: 'input',
        name: 'name',
        message: 'Command name: ',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Command Description: ',
      },
      {
        type: 'input',
        name: 'category',
        message: 'Command Category: ',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Command type: ',
        default: 'both',
        choices: [
          { name: 'Slash', value: 'slash' },
          { name: 'Message', value: 'message' },
          { name: 'Both', value: 'both' },
        ],
      },
    ];

    if (options.includeAll) {
      prompt.push({
        type: 'checkbox',
        name: 'allOptions',
        message: 'Include in command: ',
        choices: [
          {
            name: 'User Permissions',
            value: 'userPerms',
          },
          {
            name: 'Client Permissions',
            value: 'clientPerms',
          },
          {
            name: 'Global Cooldown',
            value: 'globalCooldown',
          },
          {
            name: 'Guild Cooldown',
            value: 'guildCooldown',
          },
          {
            name: 'Server Owner Only',
            value: 'guildOwnerOnly',
          },
        ],
      });
    }
    return prompt;
  }

  private generatePrompt(
    options: string[]
  ): inquirer.QuestionCollection<any>[] {
    const prompt: inquirer.QuestionCollection<any>[] = [];

    if (options?.includes('userPerms')) {
      prompt.push({
        type: 'checkbox',
        name: 'userPerms',
        message: 'User permission to user this command: ',
        choices: [
          {
            name: 'Manage_Channel',
            value: 'manageChannel',
          },
          {
            name: 'Read_Message_History',
            value: 'readMessageHistory',
          },
        ],
      });
    }

    return prompt;
  }
}
