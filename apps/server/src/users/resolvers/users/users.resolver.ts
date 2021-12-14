import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { GqlExecutionContext, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { GraphQLAuthGuard } from 'src/auth/utils/Guards';
import { Guild } from 'src/guild/models/guild';
import { UserObject } from 'src/users/dto/user';
import { IUsersProvider } from 'src/users/types';
import { AxiosResponse } from 'axios';
import { User as UserSchema } from '../../../schemas';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

@Resolver()
@UseGuards(GraphQLAuthGuard)
export class UsersResolver {
  constructor(
    @Inject('USERS_SERVICE')
    private readonly usersService: IUsersProvider,
  ) {}

  @Query(() => UserObject, { name: 'user', nullable: false })
  async currentUser(@CurrentUser() user: UserSchema): Promise<UserSchema> {
    console.log('gotuser');
    return user;
  }

  @Query(() => [Guild])
  async ownerGuilds(
    @CurrentUser() user: UserSchema,
  ): Promise<Observable<AxiosResponse<Guild[]>>> {
    const { accessToken } = user;
    return this.usersService.fetchOwnerGuilds(accessToken);
  }
}
