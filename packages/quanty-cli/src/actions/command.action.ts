import { normalize, strings } from '@angular-devkit/core'
import { SchematicLoader } from '../loaders/schematic.loader'

export class CommandAction {
  constructor() {}

  public static execute(schematic: string, options: any) {
    return new Promise<null | string>((resolve, reject) => {
      const transformedOptions = CommandAction.transformOptions(options)
      const process = SchematicLoader.executeSchematic(
        schematic,
        transformedOptions,
      )

      process.on('close', code => {
        if (code === 0) {
          resolve(null)
        } else {
          console.error(`An error occured, I don't know why`)
          reject()
        }
      })
    })
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

    if (options.type) {
      returnObject.push(`--type="${options.type}"`)
    }

    if (options.path) {
      returnObject.push(
        `--path="${normalize(options.path)}/${strings.dasherize(
          options.category,
        )}"`,
      )
    }

    /**
     * Turns array into strings and replaces the commands with a space
     */
    return returnObject.toString().replace(/,/g, ' ')
  }
}
