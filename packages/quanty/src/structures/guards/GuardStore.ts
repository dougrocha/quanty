import type {
  CommandInteraction,
  ContextMenuCommandInteraction,
} from 'discord.js'
import { isEmpty } from '../../util'
import { Store } from '../store/Store'
import { Guard } from './Guard'

export class GuardStore extends Store<Guard> {
  public constructor() {
    super(Guard, { name: 'guards' })
  }

  public async tryActivate(
    guards: Guard[],
    context: ExecutionContextArgs,
  ): Promise<boolean> {
    if (!guards || isEmpty(guards)) {
      return true
    }

    for (const guard of guards) {
      const tryGuard = this.get(guard.name) as Guard

      if (!tryGuard.canActivate)
        throw new Error(
          `No canActivate method on ${tryGuard.name}\nPath: ${JSON.stringify(
            tryGuard.location,
            null,
            2,
          )}`,
        )

      const result = tryGuard.canActivate?.({
        getCommandInteraction: () => context.interaction as CommandInteraction,
        getContextMenuInteraction: () =>
          context.interaction as ContextMenuCommandInteraction,
        getHandler: () => context.handler,
        reflector: () => Reflector,
      })

      return result
    }

    return true
  }
}

export const Reflector = {
  get: function <TResult = unknown, TKey = unknown>(
    metadataKey: TKey,
    target: (...args: unknown[]) => unknown,
  ): TResult {
    return Reflect.getMetadata(metadataKey, target)
  },
}

export interface ExecutionContext {
  getCommandInteraction(): CommandInteraction
  getContextMenuInteraction(): ContextMenuCommandInteraction
  getHandler(): () => void
  reflector(): typeof Reflector
}

export interface ExecutionContextArgs {
  interaction: unknown
  handler: () => void
}
