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

    if (!options.description) {
      throw new CommandVerificationError(
        Messages.INVALID_SLASH_OPTION(target.name, 'Description must exist.'),
      )
    }

    if (options.description.length > 100) {
      throw new CommandVerificationError(
        Messages.INVALID_SLASH_OPTION(
          target.name,
          'Description must be between 1 and 100 in length.',
        ),
      )
    }

    Object.defineProperties(target.prototype, {
      name: {
        // Must be set to lowercase to work with discord api
        value: name.toLowerCase(),
        enumerable: true,
        writable: true,
      },
      description: {
        value: options.description ?? '',
        enumerable: true,
        writable: true,
      },
      ephemeral: {
        value: options.ephemeral ?? false,
        enumerable: true,
        writable: true,
      },
      cmdType: {
        value: 'slash',
        enumerable: true,
        writable: false,
      },
      slashOptions: {
        value: options.options ?? [],
        enumerable: true,
        writable: true,
      },
      _className: {
        value: target.name,
        enumerable: true,
        writable: false,
      },
    })

    return target
  })
}
