import { checkChannel, Command } from '@quanty/framework'

export const command: Command = {
  name: 'stop',
  description: 'Stop Quanty and clears the queue.',
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

    player.disconnect()
    player.destroy()

    return {
      content: 'Bye!',
    }
  },
}
