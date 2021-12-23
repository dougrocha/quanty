import { MessageEmbed } from 'discord.js'
import { checkChannel, ICommand } from '@quanty/framework'

export const command: ICommand = {
  name: 'previous',
  description: 'Plays the previous song',
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

    if (!player.queue.current) return { content: 'Play a song first to skip' }

    const embed = new MessageEmbed()

    const previous = player.queue.previous
    const current = player.queue.current

    if (!previous)
      return {
        content: "There's no song you can go back to.",
      }

    player.queue.unshift(current)
    await player.play(previous)

    embed
      .setTitle(`\`Playing previous song.\``)
      .addField('Now playing: ', `${previous.title}`)

    player.queue.previous = null
    return { embeds: [embed] }
  },
}
