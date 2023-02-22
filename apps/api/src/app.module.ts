import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import {
  CacheModule,
  CacheStore,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RouterModule } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ThrottlerModule } from '@nestjs/throttler'
import { redisStore } from 'cache-manager-redis-store'

import { AuthModule } from './auth/auth.module'
import {
  RawBodyMiddleware,
  JsonBodyMiddleware,
  PRISMA_SERVICE,
  GUILDS_SERVICE,
  AUTH_SERVICE,
} from './common'
import { GqlConfigService } from './config/GraphQL.config'
import { ValidationSchema } from './config/validationSchema.config'
import { DiscordController } from './discord/discord.controller'
import { DiscordModule } from './discord/discord.module'
import { GuildsModule } from './guilds/guilds.module'
import { HealthModule } from './health/health.module'
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
      validationSchema: ValidationSchema,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('CACHE_TTL'),
        // Currently RedisCacheStore does not implement a correct interface
        // Please keep the `as CacheStore` until this is fixed
        store: (await redisStore({
          url: configService.get('REDIS_URL'),
        })) as unknown as CacheStore,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule, GuildsModule, ConfigModule],
      inject: [AUTH_SERVICE, GUILDS_SERVICE, ConfigService],
      useClass: GqlConfigService,
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
      apiVersion: '2022-11-15',
      typescript: true,
      appInfo: {
        name: 'Quantum Bot Server',
        version: '0.0.1',
      },
    }),
    PaymentsModule,
    DiscordModule,
    HealthModule,
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

