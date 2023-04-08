import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@quanty/db'
import { TokenSet, type DefaultSession, type NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
    error?: 'RefreshAccessTokenError'
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User {
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn(params) {
      console.log(params)

      return Promise.resolve(true)
    },
    async session({ session, user }) {
      const [discord] = await prisma.account.findMany({
        where: { userId: user.id, provider: 'discord' },
      })

      if (
        !discord?.expires_at ||
        !process.env.DISCORD_CLIENT_SECRET ||
        !process.env.DISCORD_CLIENT_ID
      )
        throw new Error('Missing credentials')

      try {
        if (discord.expires_at * 1000 > Date.now()) {
          if (!discord.refresh_token) throw new Error('Missing refresh token')

          const response = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
              client_id: process.env.DISCORD_CLIENT_ID,
              client_secret: process.env.DISCORD_CLIENT_SECRET,
              grant_type: 'refresh_token',
              refresh_token: discord.refresh_token,
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })

          const tokens = (await response.json()) as TokenSet & {
            expires_in: number
          }

          if (!response.ok) throw tokens

          await prisma.account.update({
            data: {
              access_token: tokens.access_token,
              expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
              refresh_token: tokens.refresh_token ?? discord.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: 'discord',
                providerAccountId: discord.providerAccountId,
              },
            },
          })
        } else {
          await prisma.account.delete({
            where: {
              provider_providerAccountId: {
                provider: 'discord',
                providerAccountId: discord.providerAccountId,
              },
            },
          })
          session.error = 'RefreshAccessTokenError'
        }
      } catch (error) {
        session.error = 'RefreshAccessTokenError'
      }

      if (session.user) {
        session.user.id = user.id
      }

      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            'identify email guilds applications.commands.permissions.update',
        },
      },
    }),

    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
}
