import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
} from '@quanty/framework'

import { checkChannel } from '../../libs'

@Category('music')
@SlashCommand('pause', {
  description: 'Pauses the song.',
})
export class PauseCommand extends Command {
  async run({ guild, user }: SlashCommandRunOptions): CommandReturnType {
    const { content, player } = checkChannel({
      guild,
      user,
    })
    if (!player) {
      return {
        content,
      }
    }
    if (player.paused) return { content: 'Quanty is already paused.' }
    player.pause(true)
    return { content: 'Quanty is now paused' }
  }
  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
