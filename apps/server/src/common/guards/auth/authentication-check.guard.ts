import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    return req.isAuthenticated()
  }
}

@Injectable()
export class GraphQLAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req

    if (!user) {
      throw new ForbiddenException(
        {
          message: 'User is not authenticated',
          code: 403,
        },
        'Unauthenticated',
      )
    }

    return user
  }
}
