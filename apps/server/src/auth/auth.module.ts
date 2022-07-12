import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { DiscordStrategy } from './strategies/discord'

import {
  PAYMENT_SERVICE,
  PRISMA_SERVICE,
  SessionSerializer,
  USERS_SERVICE,
  AUTH_SERVICE,
} from '../common'
import { PaymentsService } from '../payments/services/payments.service'
import { PrismaService } from '../prisma.service'
import { UsersService } from '../users/services/users.service'

@Module({
  imports: [HttpModule],
  providers: [
    DiscordStrategy,
    SessionSerializer,
    { provide: AUTH_SERVICE, useClass: AuthService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: USERS_SERVICE, useClass: UsersService },
    { provide: PAYMENT_SERVICE, useClass: PaymentsService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
