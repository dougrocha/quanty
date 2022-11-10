import { TEST_COMMAND_METADATA } from '../../constants'

import { createClassDecorator } from '../utils/decoratorFactories'

// /**
//  *
//  * @param aliases
//  * @returns
//  */
// export function Alias(...aliases: string[]): ClassDecorator {
//   return setMetaData('aliases', aliases)
// }

export function Test(boolean = true): ClassDecorator {
  return createClassDecorator(target => {
    Reflect.defineMetadata(TEST_COMMAND_METADATA, boolean, target.prototype)

    return target
  })
}

// /**
//  * Sets category for command
//  * @param name Name of category
//  */
// export function Category(name: string): ClassDecorator {
//   return setMetaData('category', name)
// }

// /**
//  * Sets cooldown for users in guilds
//  * @param data Object containing start time, amount of uses, and timeout length
//  */
// export function UserCooldown(data: CooldownObject): ClassDecorator {
//   return setMetaData('cooldown', data)
// }

// export function UserPermissions(...perms: PermissionsString[]): ClassDecorator {
//   return setMetaData('userPermissions', perms)
// }

// export function ClientPermissions(
//   ...perms: PermissionsString[]
// ): ClassDecorator {
//   return setMetaData('clientPermissions', perms)
// }
