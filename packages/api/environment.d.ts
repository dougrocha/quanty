/**
 * Will have to manually update
 * You could import serverEnv from `@quanty/app` but it may cause circular dependency.
 */
declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'

    DISCORD_CLIENT_ID: string
    DISCORD_CLIENT_SECRET: string
    DISCORD_CLIENT_TOKEN: string
  }
}
