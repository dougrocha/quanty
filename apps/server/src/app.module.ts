import { join } from 'path'

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { ThrottlerModule } from '@nestjs/throttler'

import { AuthModule } from './auth/auth.module'
import { GuildsModule } from './guilds/guilds.module'
import { UsersModule } from './users/users.module'

const ENV = process.env.NODE_ENV

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV ? `.env.${ENV}` : `.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGOURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    PassportModule.register({ session: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        useGlobalPrefix: true,
        sortSchema: true,
        cors: {
          origin: ENV ? 'https://quanty.xyz' : 'http://localhost:3000',
        },
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context: ({ req, res }) => ({ req, res }),
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
    AuthModule,
    GuildsModule,
    UsersModule,
  ],
})
export class AppModule {}
