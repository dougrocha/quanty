import { CommandVerificationError, Messages } from '../../errors'
import type { SlashCommandExtraData } from '../types/command'
import { createClassDecorator } from '../utils/decoratorFactories'

export function SlashCommand(
  name: string,
  options: SlashCommandExtraData,
): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return createClassDecorator(target => {
    if (name.length > 32) {
      throw new CommandVerificationError(
        Messages.INVALID_SLASH_NAME(
          target.name,
          'Must be between 1 and 32 in length.',
        ),
      )
    }

    Object.defineProperties(target.prototype, {
      commandName: {
        // Must be set to lowercase to work with discord api
        value: name.toLowerCase(),
        enumerable: true,
        configurable: true,
        writable: true,
      },
      description: {
        value: options.description ?? '',
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
        value: options.options ?? [],
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
