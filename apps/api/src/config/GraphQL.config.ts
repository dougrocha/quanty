import { join } from 'path'

import { ApolloDriverConfig } from '@nestjs/apollo'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GqlOptionsFactory, GraphQLISODateTime } from '@nestjs/graphql'
import { Request } from 'express'

import { IAuthenticationService } from '../auth/interfaces/auth'

import { GraphQLError, GraphQLFormattedError } from 'graphql'

import { AUTH_SERVICE, GUILDS_SERVICE } from '../common'
import { IGuildsService } from '../guilds/interfaces/guilds'
import { useSessionMiddleware } from '../main'

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthenticationService,
    @Inject(GUILDS_SERVICE) private readonly guildsService: IGuildsService,
  ) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      cache: 'bounded',
      useGlobalPrefix: true,
      sortSchema: true,
      debug: true,
      cors: {
        origin: this.configService.get('FRONTEND_URL'),
        credentials: true,
      },
      installSubscriptionHandlers: true,
      introspection: true,
      context: async ({ req, res, payload, connection }) => ({
        req,
        res,
        payload,
        connection,
      }),
      subscriptions: {
        'graphql-ws': {
          onConnect: async ctx => {
            const req = (ctx.extra as any).request as Request
            const res = {} as any
            useSessionMiddleware(req, res, () => {
              return
            })
            await this.authService.validateSession(req.sessionID)
            return { connected: true }
          },
          onSubscribe: async (payload, ctx) => {
            const user = (payload.extra as any).request.session.passport.user

            if (!user) return [new GraphQLError('Unauthenticated subscription')]

            const mutualGuilds = await this.guildsService.getMutualGuilds(user)

            const guildId = (ctx.payload.variables as Record<string, string>)
              .guildId

            const guild = mutualGuilds.find(guild => guild.id === guildId)

            if (!guild)
              return [new GraphQLError('You do not have access to this guild')]
          },
        },
        'subscriptions-transport-ws':
          this.configService.get('NODE_ENV') !== 'production',
      },
      autoTransformHttpErrors: true,
      csrfPrevention: this.configService.get('NODE_ENV') === 'production',
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
        }
        return graphQLFormattedError
      },
      resolvers: { DateTime: GraphQLISODateTime },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }
  }
}
