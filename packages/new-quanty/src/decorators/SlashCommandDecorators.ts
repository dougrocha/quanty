import { CommandData } from '../structures/command/typings/CommandData'

export function SlashCommand(data: CommandData): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function <T extends Function>(target: T): T {
    Object.defineProperties(target.prototype, {
      name: {
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
    })

    target.prototype.cmdType = 'slash'

    return target
  }
}
