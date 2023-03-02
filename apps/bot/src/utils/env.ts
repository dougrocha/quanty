import { z } from 'zod'

export const clientEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),

  DISCORD_CLIENT_TOKEN: z.string().min(1),
})

export const clientEnv = {
  NODE_ENV: process.env.NODE_ENV,

  DATABASE_URL: process.env.DATABASE_URL,

  DISCORD_CLIENT_TOKEN: process.env.DISCORD_CLIENT_TOKEN,
}

const formatErrors = (
  errors: z.ZodFormattedError<Map<string, string>, string>,
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value)
        return `${name}: ${value._errors.join(', ')}\n`
    })
    .filter(Boolean)

const _serverEnv = clientEnvSchema.safeParse(clientEnv)

if (!_serverEnv.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(_serverEnv.error.format()),
  )
  throw new Error('Invalid environment variables')
}
