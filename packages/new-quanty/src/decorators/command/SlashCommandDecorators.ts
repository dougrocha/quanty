export interface CommandData {
  name: string
  description: string
  ephemeral?: boolean
}

export function SlashCommand(data: CommandData): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function <T extends Function>(target: T): T {
    Object.defineProperties(target.prototype, {
      commandName: {
        value: data.name,
        enumerable: false,
        configurable: true,
        writable: true,
      },
      description: {
        value: data.description,
        enumerable: false,
        configurable: true,
        writable: true,
      },
      ephemeral: {
        value: data.ephemeral,
        enumerable: false,
        configurable: true,
        writable: true,
      },
      cmdType: {
        value: 'slash',
        enumerable: false,
        configurable: true,
        writable: true,
      },
    })

    return target
  }
}
