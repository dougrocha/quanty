import { ChildProcess, spawn, SpawnOptions } from 'child_process'

export class SchematicLoader {
  public static executeSchematic(
    schematic: string,
    _options: any,
  ): PromiseLike<ChildProcess | null> {
    return new Promise<ChildProcess | null>((resolve, reject) => {
      const options: SpawnOptions = {
        cwd: process.cwd(),
        stdio: 'inherit',
        shell: true,
      }

      console.log(_options)

      return spawn(
        `node`,
        [
          `${SchematicLoader.findSchematicsBinary()}`,
          `@quanty/schematics:${schematic}`,
          _options,
        ],
        options,
      ).on('close', code => {
        if (code === 0) {
          resolve(null)
        } else {
          console.error(`An error occurred, I don't know why`)
          reject()
        }
      })
    })
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
