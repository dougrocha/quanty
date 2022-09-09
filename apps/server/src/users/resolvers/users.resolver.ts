import { Inject, UseGuards } from '@nestjs/common'
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { Customers, Users } from '../../@generated'
import { GraphQLAuthGuard, GqlUser, USERS_SERVICE } from '../../common'
import { IUsersService } from '../interfaces/users'

@Resolver(() => Users)
@UseGuards(GraphQLAuthGuard)
export class UsersResolver {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: IUsersService,
  ) {}

  @Query(() => Users, {
    name: 'me',
    nullable: true,
    description: 'Returns the user that is logged in the session',
  })
  async getCurrentUser(@GqlUser() user: Users): Promise<Users | null> {
    await this.usersService.findCustomer(user.id)

    if (!user) return null
    return user
  }

  @ResolveField('customer', () => Customers, {
    description: "User's customer account.",
    nullable: true,
  })
  async customer(@Parent() user: Users): Promise<Customers | null> {
    return await this.usersService.findCustomer(user.id)
  }
}
