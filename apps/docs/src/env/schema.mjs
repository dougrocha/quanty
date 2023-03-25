// @ts-check
import { z } from 'zod'

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_DISCORD_INVITE_URL: z.string().url(),
  NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL: z.string().url(),
  NEXT_PUBLIC_GITHUB_URL: z.string().url(),
  NEXT_PUBLIC_WEBAPP_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_NAME: z.string().optional(),
})

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.input<typeof clientSchema>]: string | undefined  }}
 */
export const clientEnv = {
  NEXT_PUBLIC_DISCORD_INVITE_URL: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL,
  NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL:
    process.env.NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL,
  NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
  NEXT_PUBLIC_WEBAPP_URL: process.env.NEXT_PUBLIC_WEBAPP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
}
