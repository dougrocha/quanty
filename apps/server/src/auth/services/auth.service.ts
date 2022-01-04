import { Inject, Injectable } from '@nestjs/common'
import { UserDetails } from 'src/common/types'
import { UserDocument } from 'src/schemas'
import { IUsersService } from 'src/users/interfaces/users'

import { IAuthenticationService } from '../interfaces/auth'

@Injectable()
export class AuthService implements IAuthenticationService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: IUsersService,
  ) {}

  async validateUser(details: UserDetails): Promise<UserDocument> {
    const user = await this.usersService.findUser(details.discordId)
    return user
      ? await this.usersService.updateUser(user, details)
      : await this.usersService.createUser(details)
  }
}
