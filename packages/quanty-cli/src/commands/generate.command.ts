import { Command } from 'commander'
import inquirer from 'inquirer'

import { AbstractCommand } from './abstract.command'

import { CommandGenAction } from '../actions/command.action'
import { FeatureGenAction } from '../actions/feature.action'

export interface CommandType {
  name: string
  description?: string
  category: string
  type?: string
}

export default class GenerateCommand extends AbstractCommand {
  public async load(program: Command): Promise<void> {
    program
      .command('generate <schematic> [path]')
      .alias('gen')
      .description('Generates a new file')
      .option('-i, --include-all', 'Includes all options')
      .action(this.execute())
  }

  private execute() {
    /**
     * Schematic - string
     * Path - string
     * CommandOptions - { includeAll: true }
     */
    return async (schematic: string, path: string, commandOptions: any) => {
      switch (schematic) {
        case 'command':
          await this.commandPrompt(schematic, path, commandOptions)
          break
        case 'feature':
          await this.featurePrompt(schematic, path, commandOptions)
          break
      }
    }
  }

  private async commandPrompt(
    schematic: string,
    path: string,
    commandOptions: any,
  ) {
    await inquirer
      .prompt(CommandGenAction.generateStarterPrompt(commandOptions))
      .then(async (baseOptions: any) => {
        await inquirer
          .prompt(CommandGenAction.generatePrompt(baseOptions.allOptions))
          .then(async (extraOptions: any) => {
            const args = Object.assign({}, baseOptions, extraOptions, {
              path,
            })
            await CommandGenAction.execute(schematic, args)
          })
      })
  }
  private async featurePrompt(
    schematic: string,
    path: string,
    commandOptions: any,
  ) {
    await inquirer
      .prompt(FeatureGenAction.generatePrompt(commandOptions))
      .then(async (baseOptions: any) => {
        const args = Object.assign({}, baseOptions, {
          path,
        })
        await FeatureGenAction.execute(schematic, args)
      })
  }
}
