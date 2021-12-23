import { ChildProcess, spawn, SpawnOptions } from 'child_process'
import { CommandAction } from '../actions/command.action'

export class SchematicLoader {
  public static executeSchematic(
    schematic: string,
    _options: any,
  ): ChildProcess {
    const options: SpawnOptions = {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
    }

    return spawn(
      `node`,
      [
        `${SchematicLoader.findSchematicsBinary()}`,
        `@quanty/schematics:${schematic}`,
        _options,
      ].concat(CommandAction.transformOptions(_options)),
      options,
    )
  }

  public static findSchematicsBinary() {
    try {
      return require.resolve(
        '@angular-devkit/schematics-cli/bin/schematics.js',
        { paths: module.paths },
      )
    } catch {
      throw new Error("'schematics' binary path could not be found!")
    }
  }
}
