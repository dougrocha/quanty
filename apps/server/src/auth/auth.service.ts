import { Inject, Injectable } from '@nestjs/common'

import { IAuthenticationService } from './interfaces/auth'

import {
  User,
  UserCreateWithoutCustomerInput,
} from '../@generated/prisma-nestjs-graphql'
import { IUsersService } from '../users/interfaces/users'

@Injectable()
export class AuthService implements IAuthenticationService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: IUsersService,
  ) {}

  async validateUser(details: UserCreateWithoutCustomerInput): Promise<User> {
    const user = await this.usersService.findUser(details.id)

    return user
      ? await this.usersService.updateUser(user.id, details)
      : await this.usersService.createUser(details)
  }
}
