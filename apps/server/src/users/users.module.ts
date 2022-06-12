import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Guilds, GuildsSchema, Users, UsersSchema } from '@quanty/schemas'

import { UsersResolver } from './resolvers/users.resolver'
import { UsersService } from './services/users.service'

import { PAYMENT_SERVICE, USERS_SERVICE } from '../common'
import { PaymentsService } from '../payments/services/payments.service'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: Guilds.name, schema: GuildsSchema }]),
  ],
  providers: [
    { provide: USERS_SERVICE, useClass: UsersService },
    { provide: PAYMENT_SERVICE, useClass: PaymentsService },
    UsersResolver,
  ],
  exports: [{ provide: USERS_SERVICE, useClass: UsersService }],
})
export class UsersModule {}
