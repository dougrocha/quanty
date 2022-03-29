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
@SlashCommand('previous', {
  description: 'Plays the previous song.',
})
export class PreviousCommand extends Command {
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
    if (!player.queue.current) return { content: 'Play a song first to skip' }
    const embed = new MessageEmbed()
    const { previous } = player.queue
    const { current } = player.queue
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
  }
  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
