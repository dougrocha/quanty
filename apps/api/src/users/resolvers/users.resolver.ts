import { Inject, UseGuards } from '@nestjs/common'
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { Customer, User } from '../../@generated'
import { GraphQLAuthGuard, GqlUser, USERS_SERVICE } from '../../common'
import { IUsersService } from '../interfaces/users'

@Resolver(() => User)
@UseGuards(GraphQLAuthGuard)
export class UsersResolver {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: IUsersService,
  ) {}

  @Query(() => User, {
    name: 'me',
    nullable: true,
    description: 'Returns the user that is logged in the session',
  })
  async getCurrentUser(@GqlUser() user: User): Promise<User | null> {
    await this.usersService.findCustomer(user.id)

    if (!user) return null
    return user
  }

  @ResolveField('customer', () => Customer, {
    description: "User's customer account.",
    nullable: true,
  })
  async customer(@Parent() user: User): Promise<Customer | null> {
    return await this.usersService.findCustomer(user.id)
  }
}
