import { checkChannel, Command } from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
  name: 'loop',
  description: 'Loops the queue',
  options: [],
  category: 'music',
  run: ({ client, member, guild }) => {
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

    const embed = new MessageEmbed().setAuthor(`Queue for ${guild.name}`)

    if (player.queue.length == 0) {
      return { embeds: [embed.setDescription('Queue is empty')] }
    }

    if (player.queueRepeat) {
      embed.setDescription('Queue Loop is off')
      player.setQueueRepeat(false)
      return { embeds: [embed] }
    }
    embed.setDescription('Queue is Looped')
    player.setQueueRepeat(true)
    return { embeds: [embed] }
  },
}
