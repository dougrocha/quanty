import { Guard } from '../../src/structures/guards/Guard'

export class TestingGuard extends Guard {
  async canActivate(interaction: unknown) {
    console.log('TESTINGGUARD', interaction)
    return false
  }
}
