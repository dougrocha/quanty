/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface QuantyOptions {
  baseDir?: string
  commandDir?: string
  /**
   * Default commands and events provided by quanty
   */
  defaults?:
    | boolean
    | {
        /**
         * @example [object Object]
         */
        commands?:
          | boolean
          | {
              help?: boolean
              ping?: boolean
            }
        /**
         * @example {"interaction":false,"ready":false}
         */
        events?:
          | boolean
          | {
              interaction?: boolean
              ready?: boolean
            }
      }
  devGuilds?: string[] | string
  eventDir?: string
  logLevel?: 'DEBUG' | 'ALL' | 'WARN' | 'ERROR'
  mentionPrefix?: boolean
  outDir?: string
  owner: string
  prefix?: string
  token?: string
}