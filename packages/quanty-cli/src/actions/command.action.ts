import { strings } from '@angular-devkit/core'
import inquirer from 'inquirer'

import { pathResolver } from '../commands'
import { SchematicLoader } from '../loaders/schematic.loader'

export class CommandGenAction {
  public static async execute(schematic: string, options: any) {
    const transformedOptions = this.transformOptions(options)

    await SchematicLoader.executeSchematic(schematic, transformedOptions)
  }

  public static transformOptions(options: any): string {
    const returnObject = []

    if (options.name) {
      returnObject.push(`--name="${strings.dasherize(options.name)}"`)
    }

    if (options.description) {
      returnObject.push(`--description="${options.description}"`)
    }

    if (options.category) {
      returnObject.push(`--category="${strings.dasherize(options.category)}"`)
    }

    if (options.cmdType) {
      returnObject.push(`--cmdType="${options.cmdType}"`)
    }

    options.path = returnObject.push(
      pathResolver(options.path, options.category),
    )

    /**
     * Turns array into strings and replaces the commands with a space
     */
    return returnObject.toString().replace(/,/g, ' ')
  }

  public static generateStarterPrompt(
    options: any,
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
    ]

    if (options.includeAll) {
      prompt.push(
        {
          type: 'list',
          name: 'cmdType',
          message: 'Command type: ',
          default: 'both',
          choices: [
            { name: 'Slash', value: 'slash' },
            { name: 'Message', value: 'message' },
            { name: 'Both', value: 'both' },
          ],
        },
        {
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
        },
      )
    }
    return prompt
  }

  public static generatePrompt(
    options: string[],
  ): inquirer.QuestionCollection<any>[] {
    const prompt: inquirer.QuestionCollection<any>[] = []

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
      })
    }

    return prompt
  }
}
