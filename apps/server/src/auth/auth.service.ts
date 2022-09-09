import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { AuthenticationError } from 'apollo-server-express'
import { Cache } from 'cache-manager'

import { IAuthenticationService } from './interfaces/auth'

import { Users, UsersCreateWithoutCustomerInput } from '../@generated'
import { PRISMA_SERVICE, USERS_SERVICE } from '../common'
import { IUsersService } from '../users/interfaces/users'

@Injectable()
export class AuthService implements IAuthenticationService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaClient,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async validateUser(details: UsersCreateWithoutCustomerInput): Promise<Users> {
    const user = await this.usersService.findUser(details.id)

    return user
      ? await this.usersService.updateUser(user.id, details)
      : await this.usersService.createUser(details)
  }

  async findUser(sid: string): Promise<Users> {
    // This only works if both redis clients are the same
    const user = await this.cacheManager.get(`sess:${sid}`)

    if (!user) throw new AuthenticationError('Invalid session')

    return user as Users
  }
}
