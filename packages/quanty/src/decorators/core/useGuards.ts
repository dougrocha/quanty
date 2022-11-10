import { createMethodDecorator } from '../utils'
import { isFunction } from '../../util'
import { GUARDS_METADATA } from '../../constants'
import { validateEach } from '../../util/guards/validateEach'
import { extendArrayMetadata } from '../../util/guards/extendArrayMetadata'

// eslint-disable-next-line @typescript-eslint/ban-types
export const UseGuards = (...guards: Function[]) => {
  return createMethodDecorator((target, key, descriptor) => {
    const isGuardValid = <T extends () => unknown | Record<string, unknown>>(
      guard: T,
    ) =>
      guard &&
      (isFunction(guard) ||
        isFunction((guard as Record<string, unknown>).canActivate))

    validateEach(
      target.constructor,
      guards,
      isGuardValid,
      '@UseGuards',
      'guard',
    )

    // eslint-disable-next-line @typescript-eslint/ban-types
    extendArrayMetadata(GUARDS_METADATA, guards, descriptor.value as Function)

    return descriptor
  })
}
