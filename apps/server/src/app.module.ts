import { join } from 'path'

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RouterModule } from '@nestjs/core'
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql'
import { PassportModule } from '@nestjs/passport'
import { ThrottlerModule } from '@nestjs/throttler'
import { AuthenticationError } from 'apollo-server-express'
import { Request } from 'express'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import Joi from 'joi'

import { User } from './@generated'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { IAuthenticationService } from './auth/interfaces/auth'
import {
  RawBodyMiddleware,
  JsonBodyMiddleware,
  PRISMA_SERVICE,
  GUILDS_HTTP_SERVICE,
} from './common'
import { DiscordController } from './discord/discord.controller'
import { DiscordModule } from './discord/discord.module'
import { GuildsModule } from './guilds/guilds.module'
import { GuildsHttpService } from './guilds/services/guilds-http.service'
import { GuildsService } from './guilds/services/guilds.service'
import { prismaStoreClient, useSessionMiddleware } from './main'
import { PaymentsModule } from './payments/payments.module'
import { PrismaService } from './prisma.service'
import { StripeModule } from './stripe/stripe.module'
import { UsersModule } from './users/users.module'
import { HttpModule } from '@nestjs/axios'
import { IGuildsService } from './guilds/interfaces/guilds'

const ENV = process.env.NODE_ENV

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV ? `.env.${ENV}` : `.env.development`,
      isGlobal: true,
      validationSchema: Joi.object({
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
      }),
    }),
    PassportModule.register({ session: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        cache: 'bounded',
        useGlobalPrefix: true,
        sortSchema: true,
        debug: true,
        cors: {
          origin: process.env.FRONTEND_URL,
          credentials: true,
        },
        installSubscriptionHandlers: true,
        introspection: true,
        context: async ({ req, res, payload, connection }) => {
          return {
            req,
            res,
            payload,
            connection,
          }
        },
        subscriptions: {
          'graphql-ws': {
            onConnect: async ctx => {
              const req = (ctx.extra as any).request as Request
              const res = {} as any

              useSessionMiddleware(req, res, () => {
                return
              })

              await prismaStoreClient.$connect()

              const userSession =
                await prismaStoreClient.userSession.findUnique({
                  where: {
                    sid: req.sessionID,
                  },
                  select: { expiresAt: true, data: true },
                })

              if (!userSession) throw new AuthenticationError('Invalid session')

              if (userSession.expiresAt < new Date(Date.now()))
                throw new AuthenticationError('Session expired')

              const data = JSON.parse(userSession?.data ?? '')

              const user = data.passport.user as User

              if (!user.accessToken)
                throw new AuthenticationError('No access token')

              console.log('test')
              return {
                currentUser: { id: data.passport.user.id },
                user: data.passport.user,
              }
            },
            // OnClose: ctx => {
            //   console.log(
            //     'onClose',
            //     ((ctx.extra as any).request as Request).headers.cookie,
            //   )
            // },
            // onNext: ctx => {
            //   console.log(
            //     'onNext',
            //     ((ctx.extra as any).request as Request).headers.cookie,
            //   )
            // },
            // onDisconnect: ctx => {
            //   console.log(
            //     'onDisconnect',
            //     ((ctx.extra as any).request as Request).headers.cookie,
            //   )
            // },
          },
          'subscriptions-transport-ws':
            process.env.NODE_END === 'production' ? false : true,
        },
        autoTransformHttpErrors: true,
        csrfPrevention: process.env.NODE_ENV === 'production' ? true : false,
        formatError: (error: GraphQLError) => {
          const graphQLFormattedError: GraphQLFormattedError = {
            message: error.message,
          }
          return graphQLFormattedError
        },
        resolvers: { DateTime: GraphQLISODateTime },
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: process.env.THROTTLE_TTL,
      limit: process.env.THROTTLE_LIMIT,
    }),
    RouterModule.register([
      {
        path: 'stripe',
        module: StripeModule,
      },
    ]),
    AuthModule,
    GuildsModule,
    UsersModule,
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
      typescript: true,
      appInfo: {
        name: 'Quantum Bot Server',
        version: '0.0.1',
      },
    }),
    PaymentsModule,
    DiscordModule,
  ],
  providers: [{ provide: PRISMA_SERVICE, useClass: PrismaService }],
  controllers: [DiscordController],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes(
        {
          path: '/payments',
          method: RequestMethod.POST,
        },
        {
          path: '/stripe/webhook',
          method: RequestMethod.POST,
        },
      )
      .apply(JsonBodyMiddleware)
      .forRoutes('*')
  }
}
