declare namespace NodeJS {
  export interface ProcessEnv {
    BOT_SECRET: string
    DISCORD_CLIENT_ID: string
    CLIENT_SECRET: string
    DISCORD_CALLBACK_URL: string

    SESSION_COOKIE: string
    PORT: string

    WEBSOCKET_TOKEN: string

    THROTTLE_TTL: string
    THROTTLE_LIMIT: string

    STRIPE_SECRET_KEY: string
    STRIPE_PUBLISHABLE_KEY: string
    STRIPE_CURRENCY: string
    STRIPE_WEBHOOK_SECRET: string

    FRONTEND_URL: string

    NODE_ENV: 'development' | 'production' | 'test'

    DATABASE_URL: string

    REDIS_HOST: string
    REDIS_PORT: string
    REDIS_PASSWORD: string
    REDIS_USER: string
    REDIS_URL: string
  }
}
