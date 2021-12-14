import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GuildModule } from './guild/guild.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { BotModule } from './bot/bot.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
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
