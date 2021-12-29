import { checkChannel, Command } from '@quanty/framework'

export const command: Command = {
  name: 'resume',
  description: 'Resumes the song',
  options: [],
  category: 'music',
  run: ({ client, guild, member }) => {
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

    if (player.playing) return { content: 'Song is already playing.' }
    player.pause(false)
    return { content: 'Quanty is now playing' }
  },
}
