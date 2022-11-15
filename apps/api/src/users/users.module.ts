import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { UsersResolver } from './resolvers/users.resolver'
import { UsersService } from './services/users.service'

import { PAYMENT_SERVICE, PRISMA_SERVICE, USERS_SERVICE } from '../common'
import { PaymentsService } from '../payments/services/payments.service'
import { PrismaService } from '../prisma.service'

@Module({
  imports: [HttpModule],
  providers: [
    { provide: USERS_SERVICE, useClass: UsersService },
    { provide: PAYMENT_SERVICE, useClass: PaymentsService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    UsersResolver,
  ],
  exports: [{ provide: USERS_SERVICE, useClass: UsersService }],
})
export class UsersModule {}
