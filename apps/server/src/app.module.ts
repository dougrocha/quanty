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
import { Request } from 'express'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import Joi from 'joi'

import { AuthModule } from './auth/auth.module'
import { RawBodyMiddleware, JsonBodyMiddleware, PRISMA_SERVICE } from './common'
import { GuildsModule } from './guilds/guilds.module'
import { prismaStoreClient, useSessionMiddleware } from './main'
import { PaymentsModule } from './payments/payments.module'
import { PrismaService } from './prisma.service'
import { StripeModule } from './stripe/stripe.module'
import { UsersModule } from './users/users.module'

const ENV = process.env.NODE_ENV
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV ? `.env.${ENV}` : `.env`,
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      useGlobalPrefix: true,
      sortSchema: true,
      debug: true,
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
      installSubscriptionHandlers: true,
      introspection: true,
      subscriptions: {
        'graphql-ws': {
          onConnect: ctx => {
            const req = (ctx.extra as any).request as Request
            const res = {} as any
            return new Promise(async resolve => {
              useSessionMiddleware(req, res, () => {
                return
              })

              await prismaStoreClient.$connect()

              const userSession =
                await prismaStoreClient.userSession.findUnique({
                  where: {
                    sid: req.sessionID,
                  },
                  select: { expiresAt: true },
                })

              if (!userSession) return resolve(false)

              if (userSession.expiresAt < new Date(Date.now()))
                return resolve(false)

              resolve(true)
            })
          },
          // onSubscribe: (ctx: { extra: any }) => {
          //   console.log(
          //     'onSubscribe',
          //     ((ctx.extra as any).request as Request).headers.cookie,
          //   )
          // },
          // onClose: ctx => {
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
        'subscriptions-transport-ws': true,
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
      context: ({ req, res, payload, connection }) => {
        return {
          req,
          res,
          payload,
          connection,
        }
      },
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
  ],
  providers: [{ provide: PRISMA_SERVICE, useClass: PrismaService }],
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
