import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/schemas'
import { UsersService } from 'src/users/services/users.service'

import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'
import { DiscordStrategy } from './utils/DiscordStrategy'
import { SessionSerializer } from './utils/Serializer'

@Module({
  controllers: [AuthController],
  providers: [
    DiscordStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    { provide: 'USERS_SERVICE', useClass: UsersService },
  ],
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
