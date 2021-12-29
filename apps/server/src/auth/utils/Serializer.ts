import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { Done } from 'src/common/types'
import { User } from 'src/schemas'

import { IAuthenticationProvider } from '../services/auth'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: IAuthenticationProvider,
  ) {
    super()
  }

  serializeUser(user: User, done: Done) {
    done(null, user)
  }

  async deserializeUser(user: User, done: Done) {
    const userDb = await this.authService.findUser(user.discordID)
    return userDb ? done(null, userDb) : done(null, null)
  }
}
