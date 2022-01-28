declare namespace NodeJS {
  export interface ProcessEnv {
    MONGOURI: string
    DISCORD_CLIENT_ID: string
    CLIENT_SECRET: string
    DISCORD_CALLBACK_URL: string
    SESSION_COOKIE: string
    PORT: string
    MONGO_STORE_SECRET: string
    BOT_SECRET: string
    WEBSOCKET_TOKEN: string
  }
}
