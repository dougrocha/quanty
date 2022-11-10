import Joi from 'joi'

export const ValidationSchema = Joi.object<NodeJS.ProcessEnv>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  STRIPE_SECRET_KEY: Joi.string(),
  STRIPE_CURRENCY: Joi.string(),
  FRONTEND_URL: Joi.string(),
  SESSION_COOKIE: Joi.string(),
  BOT_SECRET: Joi.string(),
  WEBSOCKET_TOKEN: Joi.string(),

  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(10),

  DATABASE_URL: Joi.string().required(),

  DISCORD_CLIENT_ID: Joi.string(),
  CLIENT_SECRET: Joi.string(),
  DISCORD_CALLBACK_URL: Joi.string(),

  REDIS_URL: Joi.string(),
  CACHE_TTL: Joi.number().default(20),
})
