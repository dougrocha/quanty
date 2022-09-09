import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

import { Users } from '../../@generated'
import { IUsersService } from '../../users/interfaces/users'
import { Done } from '../types'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: IUsersService,
  ) {
    super()
  }

  serializeUser(user: Users, done: Done) {
    done(null, user)
  }

  async deserializeUser({ id }: Users, done: Done) {
    const user = await this.usersService.findUser(id)

    return user ? done(null, user) : done(null, null)
  }
}
