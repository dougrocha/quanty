import { z } from 'zod'

export const clientEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),

  DISCORD_CLIENT_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
})

export const clientEnv = {
  NODE_ENV: process.env.NODE_ENV,

  DISCORD_CLIENT_TOKEN: process.env.DISCORD_CLIENT_TOKEN,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
}

export const parseClientEnv = () => {
  const _clientEnv = clientEnvSchema.safeParse(clientEnv)

  if (!_clientEnv.success) {
    console.error(
      '❌ Invalid environment variables:\n',
      //  TODO: Eventually format these errors
      _clientEnv.error.format(),
    )
    throw new Error('Invalid environment variables')
  }
}
