import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  UseGuards,
} from '@nestjs/common'
import { GqlExecutionContext, Query, Resolver } from '@nestjs/graphql'
import { GraphQLAuthGuard } from 'src/auth/utils/Guards'
import { UserObject } from 'src/users/dto/user'
import { IUsersService } from 'src/users/interfaces/users'

import { User as UserSchema } from '../../schemas'

const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req.user
  },
)

@Resolver()
@UseGuards(GraphQLAuthGuard)
export class UsersResolver {
  constructor(
    @Inject('USERS_SERVICE')
    private readonly usersService: IUsersService,
  ) {}

  @Query(() => UserObject, { name: 'user', nullable: false })
  async currentUser(@CurrentUser() user: UserSchema): Promise<UserObject> {
    return user
  }
}
