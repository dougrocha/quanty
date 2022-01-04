import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/schemas'

import { UsersResolver } from './resolvers/users.resolver'
import { UsersService } from './services/users.service'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    { provide: 'USERS_SERVICE', useClass: UsersService },
    UsersResolver,
  ],
  exports: [{ provide: 'USERS_SERVICE', useClass: UsersService }],
})
export class UsersModule {}
