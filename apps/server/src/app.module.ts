import { join } from 'path'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'

import { AuthModule } from './auth/auth.module'
import { BotModule } from './bot/bot.module'
import { GuildModule } from './guild/guild.module'
import { UsersModule } from './users/users.module'

const ENV = process.env.NODE_ENV

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGOURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    PassportModule.register({ session: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      useGlobalPrefix: true,
      cors: {
        origin: ['http://localhost:3000'],
      },
    }),
    AuthModule,
    GuildModule,
    BotModule,
    UsersModule,
  ],
})
export class AppModule {}
