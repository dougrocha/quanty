import { join } from 'path'

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RouterModule } from '@nestjs/core'
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql'
import { PassportModule } from '@nestjs/passport'
import { ThrottlerModule } from '@nestjs/throttler'
import redisStore from 'cache-manager-redis-store'
import { Request } from 'express'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import Joi from 'joi'

import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import {
  RawBodyMiddleware,
  JsonBodyMiddleware,
  PRISMA_SERVICE,
  GUILDS_SERVICE,
  AUTH_SERVICE,
} from './common'
import { DiscordController } from './discord/discord.controller'
import { DiscordModule } from './discord/discord.module'
import { GuildsModule } from './guilds/guilds.module'
import { IGuildsService } from './guilds/interfaces/guilds'
import { useSessionMiddleware } from './main'
import { PaymentsModule } from './payments/payments.module'
import { PrismaService } from './prisma.service'
import { StripeModule } from './stripe/stripe.module'
import { UsersModule } from './users/users.module'

const ENV = process.env.NODE_ENV

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV ? `.env.${ENV}` : `.env.development`,
      isGlobal: true,
      validationSchema: Joi.object<NodeJS.ProcessEnv>({
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

        REDIS_HOST: Joi.string(),
        REDIS_PORT: Joi.number(),
        REDIS_USER: Joi.string(),
        REDIS_PASSWORD: Joi.string(),
        REDIS_URL: Joi.string(),
        CACHE_TTL: Joi.number().default(20),
      }),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: 20,
        store: redisStore.create({
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
          url: `//${configService.get('REDIS_USER')}:${configService.get(
            'REDIS_PASSWORD',
          )}@${configService.get('REDIS_HOST')}:${configService.get(
            'REDIS_PORT',
          )}`,
        }),
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ session: true }),
    AuthModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule, GuildsModule, ConfigModule],
      inject: [AUTH_SERVICE, GUILDS_SERVICE, ConfigService],
      useFactory: async (
        authService: AuthService,
        guildsService: IGuildsService,
        configService: ConfigService,
      ) => ({
        cache: 'bounded',
        useGlobalPrefix: true,
        sortSchema: true,
        debug: true,
        cors: {
          origin: configService.get('FRONTEND_URL'),
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
              const user = await authService.findUser(req.sessionID)
              return { userId: user.id }
            },
            onSubscribe: async (payload, ctx) => {
              const user = (payload.extra as any).request.session.passport.user

              if (!user)
                return [new GraphQLError('Unauthenticated subscription')]

              const mutualGuilds = await guildsService.getMutualGuilds(user)

              const guildId = (ctx.payload.variables as Record<string, string>)
                .guildId

              const guild = mutualGuilds.find(guild => guild.id === guildId)

              if (!guild)
                return [
                  new GraphQLError('You do not have access to this guild'),
                ]
            },
          },
          'subscriptions-transport-ws':
            configService.get('NODE_ENV') === 'production' ? false : true,
        },
        autoTransformHttpErrors: true,
        csrfPrevention:
          configService.get('NODE_ENV') === 'production' ? true : false,
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
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('THROTTLE_TTL'),
        limit: configService.get('THROTTLE_LIMIT'),
      }),
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: 'stripe',
        module: StripeModule,
      },
    ]),
    GuildsModule,
    UsersModule,
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-08-01',
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
