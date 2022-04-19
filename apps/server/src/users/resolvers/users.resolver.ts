import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  UseGuards,
} from '@nestjs/common'
import { GqlExecutionContext, Query, Resolver } from '@nestjs/graphql'
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { GraphQLAuthGuard } from 'src/auth/utils/Guards'
import { Guild } from 'src/guilds/models/guild'
import { UserObject } from 'src/users/dto/user'
import { IUsersService } from 'src/users/interfaces/users'

import { User as UserSchema } from '../../schemas'

export const CurrentUser = createParamDecorator(
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

  @Query(() => [Guild])
  async ownerGuilds(
    @CurrentUser() user: UserSchema,
  ): Promise<Observable<AxiosResponse<Guild[]>>> {
    const { accessToken } = user
    return this.usersService.fetchOwnerGuilds(accessToken)
  }
}
