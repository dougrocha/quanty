import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
} from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

import { checkChannel } from '../../libs'

@Category('music')
@SlashCommand('loop', {
  description: 'Loops the queue',
})
export class LoopCommand extends Command {
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

    const embed = new MessageEmbed().setAuthor({
      name: `Queue for ${guild.name}`,
    })

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
  }
  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
