import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

import { User } from '../../@generated/prisma-nestjs-graphql'
import { IUsersService } from '../../users/interfaces/users'
import { Done } from '../types'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: IUsersService,
  ) {
    super()
  }

  serializeUser(user: User, done: Done) {
    done(null, user)
  }

  async deserializeUser(user: User, done: Done) {
    const userDb = await this.usersService.findUser(user.id)

    return userDb ? done(null, userDb) : done(null, null)
  }
}
