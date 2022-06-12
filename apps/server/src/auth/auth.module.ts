import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Users, UsersSchema } from '@quanty/schemas'
import { UsersService } from 'src/users/services/users.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { DiscordStrategy } from './strategies/discord'

import { PAYMENT_SERVICE, SessionSerializer, USERS_SERVICE } from '../common'
import { PaymentsService } from '../payments/services/payments.service'

@Module({
  controllers: [AuthController],
  providers: [
    DiscordStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    { provide: USERS_SERVICE, useClass: UsersService },
    { provide: PAYMENT_SERVICE, useClass: PaymentsService },
  ],
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
})
export class AuthModule {}
