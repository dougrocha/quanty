import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()

    const isAuth = req.isAuthenticated()

    if (!isAuth) {
      throw new UnauthorizedException(
        {
          message: 'User is not authenticated',
        },
        'Unauthenticated',
      )
    }

    return isAuth
  }
}

@Injectable()
export class GraphQLAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req

    if (!user) {
      throw new UnauthorizedException(
        {
          message: 'User is not authenticated',
        },
        'Unauthenticated',
      )
    }

    return user
  }
}
