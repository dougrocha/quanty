import { SlashCommandExtraData } from '../types/command'
import { createClassDecorator } from '../utils/decoratorFactories'

export function SlashCommand(
  name: string,
  options: SlashCommandExtraData,
): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return createClassDecorator(target => {
    Object.defineProperties(target.prototype, {
      commandName: {
        value: name,
        enumerable: true,
        configurable: true,
        writable: true,
      },
      description: {
        value: options.description ?? 'No Description Found',
        enumerable: true,
        configurable: true,
        writable: true,
      },
      ephemeral: {
        value: options.ephemeral ?? false,
        enumerable: true,
        configurable: true,
        writable: true,
      },
      cmdType: {
        value: 'slash',
        enumerable: true,
        configurable: false,
        writable: false,
      },
      options: {
        value: options.options,
        enumerable: true,
        writable: false,
        configurable: false,
      },
      _className: {
        value: target.name,
        enumerable: true,
        writable: false,
        configurable: false,
      },
    })

    return target
  })
}
