import { checkChannel, Command } from '@quanty/framework'

export const command: Command = {
  name: 'pause',
  description: 'Pauses the song',
  options: [],
  category: 'music',
  run: async ({ client, guild, member }) => {
    const { content, player } = checkChannel({
      client,
      guild,
      member,
    })

    if (!player) {
      return {
        content,
      }
    }

    if (player.paused) return { content: 'Quanty is already paused.' }
    player.pause(true)
    return { content: 'Quanty is now paused' }
  },
}
