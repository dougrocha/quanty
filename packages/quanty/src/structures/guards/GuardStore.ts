import { isEmpty } from '../../util'
import { Store } from '../store/store'
import { Guard } from './Guard'

export class GuardStore extends Store<Guard> {
  public constructor() {
    super(Guard, { name: 'guards' })
  }

  public async tryActivate(guards: Guard[]): Promise<boolean> {
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

      const result = tryGuard.canActivate?.({ hello: 'string' })

      return result
    }

    return true
  }
}
