import { Command } from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
  name: 'shuffle',
  description: 'Shuffles the current queue',
  options: [],
  category: 'music',
  run: ({ client, guild }) => {
    const player = client.player.get(guild.id)

    const embed = new MessageEmbed().setColor('#FF5F9F')

    if (!player)
      return {
        embeds: [embed.setDescription('Invite Quanty to shuffle your music.')],
      }

    if (!player.queue)
      return {
        embeds: [embed.setDescription('The queue is empty.')],
      }

    embed.setDescription('Shuffled Queue!')

    player.queue.shuffle()

    return { embeds: [embed] }
  },
}
