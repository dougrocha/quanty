import Timer = NodeJS.Timer

export { Timer }

/**
 * Cooldown options for commands
 */
export interface ICooldownOptions {
  /**
   * Amount of uses per command per user
   */
  uses: number
  /**
   * Timeout limit in seconds
   */
  timeout: number
  /**
   * Whether to include owner or not
   */
  includeOwners: boolean
}

export type IActiveUserCooldown = ICooldownOptions

/**
 * Cooldown Object for users
 */
export interface CooldownObject {
  start: number
  uses: number
  timeout?: Timer
}
