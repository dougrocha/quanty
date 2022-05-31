import { Inject, UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { Users } from '@quanty/schemas'
import { IUsersService } from 'src/users/interfaces/users'

import { GraphQLAuthGuard, GqlCurrentUser } from '../../common'

@Resolver()
@UseGuards(GraphQLAuthGuard)
export class UsersResolver {
  constructor(
    @Inject('USERS_SERVICE')
    private readonly usersService: IUsersService,
  ) {}

  @Query(() => Users, { name: 'user', nullable: false })
  async currentUser(@GqlCurrentUser() user: Users): Promise<Users> {
    return user
  }
}
