// @ts-check
import { z } from 'zod'

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */

export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),

  NEXTAUTH_SECRET:
    process.env.NODE_ENV === 'production'
      ? z.string().min(1)
      : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    str => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? z.string() : z.string().url(),
  ),

  DISCORD_CLIENT_ID: z.string().min(1),
  DISCORD_CLIENT_SECRET: z.string().min(1),
  DISCORD_CLIENT_TOKEN: z.string().min(1),
})

// NODE_ENV: z.enum(['development', 'test', 'production']),

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 * @type {{ [k in keyof z.input<typeof serverSchema>]: string | undefined }}
 */
export const serverEnv = {
  NODE_ENV: process.env.NODE_ENV,

  DATABASE_URL: process.env.DATABASE_URL,

  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,

  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  DISCORD_CLIENT_TOKEN: process.env.DISCORD_CLIENT_TOKEN,
}

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
 * @type {{ [k in keyof z.input<typeof clientSchema>]: string | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_DISCORD_INVITE_URL: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL,
  NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL:
    process.env.NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL,
  NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
  NEXT_PUBLIC_WEBAPP_URL: process.env.NEXT_PUBLIC_WEBAPP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
}
