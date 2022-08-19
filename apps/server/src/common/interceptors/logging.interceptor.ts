import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger: Logger = new Logger()

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    return next.handle().pipe(tap(() => this.printResult(now, context)))
  }

  printResult(startTime: number, context: ExecutionContext) {
    const timeDiff = Date.now() - startTime

    if (timeDiff > 1000) {
      this.logger.warn(
        `- Time exceeded 1s (Run Time): ${Date.now() - startTime}ms`,
        {
          className: context.getClass().name,
          methodName: context.getHandler().name,
        },
      )
    }
  }
}
