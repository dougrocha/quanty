import type { PermissionString } from 'discord.js'

import type { CooldownObject } from '../../structures/command/types/Cooldown'
import { setMetaData } from '../utils/decoratorFactories'

/**
 *
 * @param aliases
 * @returns
 */
export function Alias(...aliases: string[]): ClassDecorator {
  return setMetaData('aliases', aliases)
}

export function Test(): ClassDecorator {
  return setMetaData('test', true)
}

/* Sets commands use to guild only */
export function GuildOnly(): ClassDecorator {
  return setMetaData('guildOnly', true)
}

/* Sets commands use for guild owners only */
export function OwnerOnly(): ClassDecorator {
  return setMetaData('ownerOnly', true)
}

/* Sets commands use to NSFW chats only */
export function NSFW(): ClassDecorator {
  return setMetaData('nsfw', true)
}

/**
 * Sets category for command
 * @param name Name of category
 */
export function Category(name: string): ClassDecorator {
  return setMetaData('category', name)
}

/**
 * Sets cooldown for users in guilds
 * @param data Object containing start time, amount of uses, and timeout length
 */
export function UserCooldown(data: CooldownObject): ClassDecorator {
  return setMetaData('cooldown', data)
}

export function UserPermissions(...perms: PermissionString[]): ClassDecorator {
  return setMetaData('userPermissions', perms)
}

export function ClientPermissions(
  ...perms: PermissionString[]
): ClassDecorator {
  return setMetaData('clientPermissions', perms)
}
