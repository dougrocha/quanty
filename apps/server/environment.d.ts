declare namespace NodeJS {
  export interface ProcessEnv {
    BOT_SECRET: string
    DISCORD_CLIENT_ID: string
    CLIENT_SECRET: string
    DISCORD_CALLBACK_URL: string

    SESSION_COOKIE: string
    PORT: number

    WEBSOCKET_TOKEN: string

    THROTTLE_TTL: number
    THROTTLE_LIMIT: number

    STRIPE_SECRET_KEY: string
    STRIPE_PUBLISHABLE_KEY: string
    STRIPE_CURRENCY: string
    STRIPE_WEBHOOK_SECRET: string

    FRONTEND_URL: string

    DATABASE_URL: string

    REDIS_HOST: string
    REDIS_PORT: number
    REDIS_PASSWORD: string
    REDIS_USER: string
    REDIS_URL: string
  }
}
