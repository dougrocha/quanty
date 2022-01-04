import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { Done } from 'src/common/types'
import { User } from 'src/schemas'
import { IUsersService } from 'src/users/interfaces/users'

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
    const userDb = await this.usersService.findUser(user.discordId)

    return userDb ? done(null, userDb) : done(null, null)
  }
}
