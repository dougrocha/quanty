import { container } from '../../container'
import type { Command } from '../Command'

export class ApplicationCommandRegistry {
  public readonly commandName: string

  public constructor(commandName: string) {
    this.commandName = commandName
  }

  public get command() {
    return container.stores?.get('commands')?.get(this.commandName) as Command
  }

  public async registerChatCommand(chatCommand: string) {
    console.log('Registration CHAT COMMAND', chatCommand)
  }

  public async runAPICalls() {
    console.log('Registration API CALLS')
  }
}

