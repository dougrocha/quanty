import { Inject, Injectable } from '@nestjs/common'
import { UsersDocument } from '@quanty/schemas'
import { IUsersService } from 'src/users/interfaces/users'

import { IAuthenticationService } from './interfaces/auth'

import { UserWithToken } from '../common'

@Injectable()
export class AuthService implements IAuthenticationService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: IUsersService,
  ) {}

  async validateUser(details: UserWithToken): Promise<UsersDocument> {
    const user = await this.usersService.findUser(details.discordId)
    return user
      ? await this.usersService.updateUser(user.discordId, details)
      : await this.usersService.createUser(details)
  }
}
