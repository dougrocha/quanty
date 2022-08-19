import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  CommandOptions,
  Test,
} from '@quanty/framework'
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js'
import { Track, UnresolvedTrack } from 'erela.js'

import { musicManager } from '../../libs/music'

@Category('music')
@SlashCommand('queue', {
  description: 'Shows the queue',
  options: [
    {
      type: ApplicationCommandOptionType.Integer,
      name: 'pages',
      description: 'Sets page for queue',
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Boolean,
      name: 'clear',
      description: 'Clears the queue.',
      required: false,
    },
  ],
})
@Test()
export class QueueCommand extends Command {
  async run({ guild, options }: CommandOptions): CommandReturnType {
    const player = musicManager.get(guild.id)

    if (options.getBoolean('clear')) {
      player?.queue.clear()
      return { content: 'Queue is cleared.' }
    }
    if (!player) return { content: 'There is no queue.' }
    const { queue } = player

    const multiple = 10
    const page = options.getInteger('pages') || 1 // Default page is one if page number does not exist
    const end = page * multiple
    const start = end - multiple
    const tracks: (Track | UnresolvedTrack)[] = queue.slice(start, end)
    const embed = new EmbedBuilder().setAuthor({
      name: `Queue for ${guild.name}`,
    })
    if (queue.current)
      embed.addFields([
        {
          name: 'Current',
          value: `[${queue.current.title}](${queue.current.uri})`,
        },
      ])
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
      embed.addFields([
        {
          name: 'Previous',
          value: `[${queue.previous.title}](${queue.previous.uri})`,
        },
      ])
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
