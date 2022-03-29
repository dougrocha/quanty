import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
} from '@quanty/framework'
import { MessageEmbed } from 'discord.js'
import { Track, UnresolvedTrack } from 'erela.js'

import MusicManager from '../../libs/music'
@Category('music')
@SlashCommand('queue', {
  description: 'Shows the queue',
  options: [
    {
      type: 'INTEGER',
      name: 'pages',
      description: 'Sets page for queue',
      required: false,
    },
  ],
})
export class QueueCommand extends Command {
  async run({ guild, options }: SlashCommandRunOptions): CommandReturnType {
    const player = MusicManager.getInstance().get(guild.id)
    if (!player) return { content: 'There is no queue.' }
    const { queue } = player

    const multiple = 10
    const page = options.getInteger('pages') || 1 // Default page is one if page number does not exist
    const end = page * multiple
    const start = end - multiple
    const tracks: (Track | UnresolvedTrack)[] = queue.slice(start, end)
    const embed = new MessageEmbed().setAuthor({
      name: `Queue for ${guild.name}`,
    })
    if (queue.current)
      embed.addField(
        'Current',
        `[${queue.current.title}](${queue.current.uri})`,
      )
    if (!tracks.length)
      embed.setDescription(
        `No tracks in ${page > 1 ? `page ${page}` : 'the queue'}.`,
      )
    else
      embed.setDescription(
        tracks
          .map((track, i) => `${start + ++i} - [${track.title}](${track.uri})`)
          .join('\n'),
      )
    if (queue.previous) {
      embed.addField(
        'Previous',
        `[${queue.previous.title}](${queue.previous.uri})`,
      )
    }
    const maxPages = Math.ceil(queue.length / multiple)
    if (maxPages !== 0)
      embed.setFooter({
        text: `Page ${page > maxPages ? maxPages : page} of ${maxPages}`,
      })
    return { embeds: [embed] }
  }
  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
