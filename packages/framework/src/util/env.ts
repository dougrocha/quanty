import { z } from 'zod'

export const clientSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),

  DISCORD_CLIENT_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
})

export const clientEnv = {
  NODE_ENV: process.env.NODE_ENV,

  DISCORD_CLIENT_TOKEN: process.env.DISCORD_CLIENT_TOKEN,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
}

