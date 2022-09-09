import { CommandVerificationError, Messages } from '../../errors'
import type { SlashCommandExtraData } from '../types/command'
import { createClassDecorator } from '../utils/decoratorFactories'

export const INTERACTION_TYPE_METADATA = '__interactiontype__'

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

    Reflect.defineMetadata(INTERACTION_TYPE_METADATA, 'slash', target.prototype)

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
      interactionType: {
        value: 'slash',
        enumerable: true,
        writable: false,
      },
      slashOptions: {
        value: options.options ?? [],
        enumerable: true,
        writable: true,
      },
    })

    return target
  })
}
