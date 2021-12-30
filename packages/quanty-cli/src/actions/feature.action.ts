import inquirer from 'inquirer'

import { pathResolver } from '../commands'
import { SchematicLoader } from '../loaders/schematic.loader'

export class FeatureGenAction {
  public static async execute(schematic: string, options: any) {
    const transformedOptions = this.transformOptions(options)
    await SchematicLoader.executeSchematic(schematic, transformedOptions)
  }

  public static transformOptions(options: any): string {
    const returnObject = []

    if (options.name) {
      returnObject.push(`--name="${options.name}"`)
    }

    if (options.once) {
      returnObject.push(`--once=true`)
    } else {
      returnObject.push(`--once=false`)
    }

    options.path = returnObject.push(
      pathResolver(options.path, options.category),
    )

    if (options.name == 'ready') {
      returnObject.push(`--args="client"`)
    }

    /**
     * Turns array into strings and replaces the commands with a space
     */

    return returnObject.toString().replace(/,/g, ' ')
  }

  public static generatePrompt(options: any): inquirer.QuestionCollection<any> {
    const prompt: inquirer.QuestionCollection<any>[] = [
      {
        type: 'input',
        name: 'name',
        message: 'Feature name: ',
        validate: input => {
          enum keys {
            ready = 'ready',
            guildMemberAdd = 'guildMemberAdd',
            guildMemberRemove = 'guildMemberRemove',
          }
          if (input in keys) {
            return true
          }
          console.log(
            `\n Please check the discord.js docs if you want to refresh your events`,
          )
          return 'sike'
        },
      },
      {
        type: 'confirm',
        name: 'once',
        default: false,
        message: 'Active once? ',
      },
      {
        type: 'input',
        name: 'category',
        message: 'Feature category (optional): ',
      },
    ]

    if (options.includeAll) {
    }

    return prompt
  }
}
