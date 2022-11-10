import { Guard } from '../../src/structures/guards/Guard'
import { ExecutionContext } from '../../src/structures/guards/GuardStore'

export class TestingGuard extends Guard {
  async canActivate(context: ExecutionContext) {
    console.log(
      'testing guard',
      Reflect.getMetadata('roles', context.getHandler()),
    )

    console.log('testing interaction', context.getCommandInteraction().user)

    if (context.getCommandInteraction().user.id === '571520537587875851') {
      console.log('IS USER')
      return true
    }

    return false
  }
}
